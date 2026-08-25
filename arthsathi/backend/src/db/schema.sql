-- =============================================================
-- ArthSathi MVP Database Schema
-- PostgreSQL
-- =============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================
-- 1. USERS
-- Core identity table. One row per registered user.
-- =============================================================

CREATE TABLE users (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number        VARCHAR(15)     NOT NULL UNIQUE,
    full_name           VARCHAR(255),                           -- populated after Aadhaar verification
    date_of_birth       DATE,
    gender              VARCHAR(10),                            -- 'male', 'female', 'other'
    address             TEXT,
    state               VARCHAR(100),
    preferred_language  VARCHAR(10)     NOT NULL DEFAULT 'hi', -- ISO 639-1 code: 'hi', 'mr', 'ta', etc.
    interaction_mode    VARCHAR(10)     NOT NULL DEFAULT 'voice'
                            CHECK (interaction_mode IN ('voice', 'text')),
    aadhaar_verified    BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Index for fast OTP/login lookup
CREATE UNIQUE INDEX idx_users_phone_number ON users (phone_number);

-- Index for filtering by state (used in scheme matching)
CREATE INDEX idx_users_state ON users (state);


-- =============================================================
-- 2. FINANCIAL_PROFILES
-- One profile per user capturing income and savings goal.
-- =============================================================

CREATE TABLE financial_profiles (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID            NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    monthly_income      NUMERIC(12, 2),                         -- nullable until user completes onboarding
    existing_debts      NUMERIC(12, 2)  NOT NULL DEFAULT 0,
    goal_category       VARCHAR(50)
                            CHECK (goal_category IN ('marriage', 'education', 'business', 'health')),
    goal_description    TEXT,                                   -- optional free-text elaboration
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- One profile per user — enforced at the database level by the unique index below
CREATE UNIQUE INDEX idx_financial_profiles_user_id ON financial_profiles (user_id);


-- =============================================================
-- 3. SCHEMES
-- Government and financial schemes catalogue, admin-managed.
-- =============================================================

CREATE TABLE schemes (
    id                      UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    name                    VARCHAR(255)    NOT NULL,
    description             TEXT            NOT NULL,
    category                VARCHAR(50)
                                CHECK (category IN ('marriage', 'education', 'business', 'health')),
    state                   VARCHAR(100),                       -- NULL = all-India scheme
    min_income              NUMERIC(12, 2),                     -- NULL = no lower bound
    max_income              NUMERIC(12, 2),                     -- NULL = no upper bound
    min_age                 INTEGER,                            -- NULL = no minimum age
    max_age                 INTEGER,                            -- NULL = no maximum age
    benefit_amount          NUMERIC(12, 2),                     -- NULL = benefit is non-monetary or variable
    application_deadline    DATE,                               -- NULL = rolling / no fixed deadline
    source_url              TEXT            NOT NULL,
    created_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Frequently filtered in matching queries
CREATE INDEX idx_schemes_category ON schemes (category);
CREATE INDEX idx_schemes_state    ON schemes (state);

-- Composite index for the most common match filter pattern
CREATE INDEX idx_schemes_category_state ON schemes (category, state);


-- =============================================================
-- 4. USER_SCHEME_MATCHES
-- Junction table recording which schemes were surfaced to which
-- users, along with the computed relevance score and action taken.
-- =============================================================

CREATE TABLE user_scheme_matches (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID            NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    scheme_id       UUID            NOT NULL REFERENCES schemes (id) ON DELETE CASCADE,
    match_score     NUMERIC(5, 2)   NOT NULL,                   -- weighted score, e.g. 0.00–100.00
    status          VARCHAR(10)     NOT NULL DEFAULT 'shown'
                        CHECK (status IN ('shown', 'clicked', 'applied', 'rejected')),
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- Primary lookup: all matches for a given user
CREATE INDEX idx_user_scheme_matches_user_id   ON user_scheme_matches (user_id);

-- Reverse lookup: all users matched to a given scheme (analytics)
CREATE INDEX idx_user_scheme_matches_scheme_id ON user_scheme_matches (scheme_id);

-- Prevent duplicate (user, scheme) pairs
CREATE UNIQUE INDEX idx_user_scheme_matches_unique
    ON user_scheme_matches (user_id, scheme_id);


-- =============================================================
-- Auto-update updated_at via trigger function
-- =============================================================

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_users
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_financial_profiles
    BEFORE UPDATE ON financial_profiles
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_schemes
    BEFORE UPDATE ON schemes
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at_user_scheme_matches
    BEFORE UPDATE ON user_scheme_matches
    FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
