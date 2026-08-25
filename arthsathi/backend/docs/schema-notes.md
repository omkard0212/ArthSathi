# ArthSathi Database Schema Notes

## Why Each Table Exists

**`users`**
Stores the core identity of every registered user — phone number is the primary identifier since most rural users don't have email, and Aadhaar details are populated after verification to keep onboarding low-friction.

**`financial_profiles`**
Separates financial data from identity data so that profile completion is optional and incremental — a user can register and start using the app before filling in income or goal details.

**`schemes`**
Acts as the admin-managed catalogue of government and financial schemes; decoupled from users so schemes can be updated, added, or expired without touching user data.

**`user_scheme_matches`**
Records the output of the matching engine — which schemes were shown to which user, at what relevance score, and what the user did with them — enabling personalisation, analytics, and feedback loops.

---

## Relationships (Plain English)

- A **user** can have exactly one **financial profile** (one-to-one). The profile is created after onboarding.
- A **user** can be matched to many **schemes**, and a **scheme** can be matched to many **users** — this is a many-to-many relationship resolved through **user_scheme_matches**.
- `financial_profiles.user_id` → `users.id` with `ON DELETE CASCADE`: deleting a user also removes their financial profile.
- `user_scheme_matches.user_id` → `users.id` with `ON DELETE CASCADE`: deleting a user removes their match history.
- `user_scheme_matches.scheme_id` → `schemes.id` with `ON DELETE CASCADE`: if a scheme is removed from the catalogue, its match records are also cleaned up.

---

## Nullable Fields and Why

### `users`
| Field | Nullable | Reason |
|---|---|---|
| `full_name` | Yes | Only populated after Aadhaar verification; user can use the app before verifying |
| `date_of_birth` | Yes | Not collected at signup; filled during profile completion |
| `gender` | Yes | Optional — not required for basic functionality |
| `address` | Yes | Optional at signup; needed only for state-specific scheme filtering |
| `state` | Yes | Optional at signup; schemes fall back to all-India results if absent |

### `financial_profiles`
| Field | Nullable | Reason |
|---|---|---|
| `monthly_income` | Yes | User may not know or want to share income immediately |
| `goal_category` | Yes | User may not have a defined goal at onboarding |
| `goal_description` | Yes | Free-text elaboration is always optional |

### `schemes`
| Field | Nullable | Reason |
|---|---|---|
| `state` | Yes | `NULL` means the scheme applies across all of India |
| `min_income` / `max_income` | Yes | Some schemes have no income restriction |
| `min_age` / `max_age` | Yes | Some schemes have no age restriction |
| `benefit_amount` | Yes | Benefit may be non-monetary (e.g. training, subsidised services) or variable |
| `application_deadline` | Yes | Rolling or evergreen schemes have no fixed deadline |

### `user_scheme_matches`
| Field | Nullable | Reason |
|---|---|---|
| *(none)* | — | All fields are required — a match record is only created when the engine produces a result |

---

## Indexes and Their Purpose

| Index | Table | Reason |
|---|---|---|
| `idx_users_phone_number` | `users` | Fast OTP login and duplicate-check lookups |
| `idx_users_state` | `users` | Filtering users by state for regional scheme targeting |
| `idx_financial_profiles_user_id` | `financial_profiles` | Direct profile fetch by user ID |
| `idx_schemes_category` | `schemes` | Primary filter in the matching engine |
| `idx_schemes_state` | `schemes` | State-level scheme filtering |
| `idx_schemes_category_state` | `schemes` | Composite filter — the most common query pattern in matching |
| `idx_user_scheme_matches_user_id` | `user_scheme_matches` | Fetch all matches for a user (main app query) |
| `idx_user_scheme_matches_scheme_id` | `user_scheme_matches` | Reverse lookup for analytics |
| `idx_user_scheme_matches_unique` | `user_scheme_matches` | Prevents the same scheme being matched to the same user twice |

---

## Notes for Future Steps

- **`updated_at` triggers** are defined in the schema so the application layer never has to remember to set them manually.
- `preferred_language` uses ISO 639-1 two-letter codes (`hi`, `mr`, `ta`, `bn`, etc.) to stay compatible with i18n libraries.
- `interaction_mode` is a `CHECK` constraint rather than an enum type to keep migrations simpler.
- Insurance, document uploads, conversation history, and loan tracking are intentionally excluded from the MVP schema and will be added as separate migration files.
