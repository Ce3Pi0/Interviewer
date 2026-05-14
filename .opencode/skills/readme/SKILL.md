---
name: "readme"
description: "README.md Postman Collection Markdown Table & Mongoose Models Markdown Table Generator"
---

# Postman Collection Markdown Table Generator

## Purpose

This skill enables the AI agent to generate clean Markdown API route tables from a Postman `collection.json` file located in the `postman` directory at the root of the project.

The generated output should group endpoints by collection folder and format them into Markdown tables.

---

## Source File

Read the following file as the source of truth:

```txt
/postman/collection.json
```

## Expected Output Format

Each Postman folder should become a Markdown section.

Format:

- ### <Route Group Name>

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/example | Example description |

## Parsing Rules
### Route Group

Use the Postman folder name field as the route group title.

Example:

{
  "name": "Authentication",
  "item": []
}
Becomes:

- ### Authentication

## Method

Use:

request.method

Examples:

- GET
- POST
- PUT
- PATCH
- DELETE

## Endpoint

Extract the endpoint from:

request.url.raw

Rules:

- Remove the {{baseUrl}} variable
- Keep only the route path

Example:

{{baseUrl}}/api/v1/server/health

Becomes:

/api/v1/server/health

## Description

Use the Postman request name field as the description.

Example:

{
  "name": "API Health"
}

Becomes:

API Health

## Example Conversion

### Input (collection.json)

{
  "name": "Server",
  "item": [
    {
      "name": "API Health",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{baseUrl}}/api/v1/server/health"
        }
      },
      "response": []
    }
  ]
}

### Output

- ### Server

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/server/health | API Health |

## Generation Rules

- Preserve the order of folders and requests from the Postman collection
- Generate one table per route group
- Include table headers for every section
- Do not include empty route groups
- Do not include request headers, responses, auth, or examples
- Keep formatting consistent across all sections
- Always use Markdown pipe table syntax

## Nested Folders

If nested folders exist inside a route group:

- Flatten nested requests into the parent section
- Preserve request order

## Final Output Requirements

The final generated Markdown should:

- Be valid .md
- Be easy to paste into README.md
- Use consistent spacing
- Avoid trailing whitespace
- Preserve capitalization from the Postman collection

## Recommended Workflow

1. Read /postman/collection.json
2. Iterate through all top-level folders
3. Extract requests
4. Transform routes into Markdown tables
5. Output grouped Markdown sections

## Output Example

- ### Authentication

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | POST | /api/v1/auth/register | Register User |
  | POST | /api/v1/auth/login | Login User |

- ### Server

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | GET | /api/v1/server/health | API Health |

# Additional Instructions — Mongoose Schema Markdown Model Generator

---

## Purpose

This extension enables the AI agent to automatically generate Markdown database model documentation from Mongoose schema models located in:

```txt
/backend/src/models/
```

The generated output should document schema fields, types, required state, and descriptions in Markdown table format.

---

# Expected Output Format

Each Mongoose model should become a Markdown section.

Format:

```md
- ### <Model Name> Model

  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | fieldName | string | Yes | Description |
```

---

# Source Files

Read all model files inside:

```txt
/backend/src/models/
```

Supported file types:

- `.ts`
- `.js`

---

# Model Name Rules

Use the exported model name or schema filename.

Examples:

```txt
User.model.ts
```

Becomes:

```md
- ### User Model
```

---

# Field Extraction Rules

Extract schema fields from:

```ts
new Schema(...)
```

or:

```ts
mongoose.Schema(...)
```

---

# Table Columns

## 1. Field

Use the schema property name.

Example:

```ts
name: { type: String, required: true }
```

Becomes:

```txt
name
```

---

## 2. Type

Convert Mongoose types into readable Markdown types.

### Type Mapping

| Mongoose Type | Markdown Type |
|---------------|---------------|
| String | string |
| Number | number |
| Boolean | boolean |
| Date | Date |
| ObjectId | ObjectId |
| Schema.Types.ObjectId | ObjectId |
| [String] | string[] |
| [Number] | number[] |
| [Boolean] | boolean[] |
| [ObjectId] | ObjectId[] |
| Mixed | any |
| Map | object |
| Buffer | Buffer |

---

## Array Detection

Example:

```ts
favorites: [{ type: Schema.Types.ObjectId, ref: "Chat" }]
```

Becomes:

```txt
ObjectId[]
```

---

## Nullable Fields

Example:

```ts
avatar?: string | null;
```

Becomes:

```txt
string | null
```

---

## 3. Required

Determine required state using schema configuration.

### Rules

| Schema Value | Output |
|--------------|--------|
| `required: true` | Yes |
| `required: false` | No |
| Missing `required` | No |
| Function-based required | Conditional |

---

## Conditional Required

Example:

```ts
required: function () {
  return !this.isAI;
}
```

Becomes:

```txt
Conditional
```

---

## 4. Description

Generate concise human-readable descriptions.

### Description Rules

- Convert camelCase into readable phrases
- Use schema refs when available
- Mention enums when useful
- Mention authentication/security fields clearly
- Keep descriptions short and consistent

---

# Reference Field Rules

If a field contains:

```ts
ref: "User"
```

Generate:

```txt
References User collection
```

Example:

```ts
blocked: [{ type: Schema.Types.ObjectId, ref: "User" }]
```

Becomes:

```md
| blocked | ObjectId[] | Yes | References User collection |
```

---

# Timestamp Rules

If schema uses:

```ts
timestamps: true
```

Automatically append:

```md
| createdAt | Date | Yes | Timestamp |
| updatedAt | Date | Yes | Timestamp |
```

---

# Ignore Rules

Do NOT document:

- Schema methods
- Middleware (`pre`, `post`)
- Virtuals
- `toJSON`
- `transform`
- Imports
- Utility functions
- TypeScript interfaces unless needed for nullable type inference

---

# Description Generation Examples

| Field | Suggested Description |
|-------|----------------------|
| email | Unique email |
| password | Hashed password |
| refreshToken | Refresh token |
| avatar | Profile image |
| enabled2fa | 2FA enabled |
| secret2fa | 2FA secret |
| favorites | References Chat collection |
| blocked | References User collection |
| isVerified | Verification status |
| forgotPassword | Forgot password state |
| provider | Auth provider |

---

# Example Conversion

## Input

```ts
favorites: [{ type: Schema.Types.ObjectId, ref: "Chat", default: [] }],
blocked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
```

## Output

```md
| favorites | ObjectId[] | Yes | References Chat collection |
| blocked | ObjectId[] | Yes | References User collection |
```

---

# Complete Example

## Output

```md
- ### User Model

  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | name | string | Yes | User name |
  | email | string | Conditional | Unique email |
  | password | string | Conditional | Hashed password |
  | googleId | string | No | Google OAuth ID |
  | refreshToken | string | No | Refresh token |
  | provider | string | Yes | Auth provider |
  | isVerified | boolean | Yes | Verification status |
  | forgotPassword | boolean | Yes | Forgot password state |
  | isAI | boolean | Yes | AI user flag |
  | avatar | string \| null | No | Profile image |
  | enabled2fa | boolean | Yes | 2FA enabled |
  | secret2fa | string | No | 2FA secret |
  | favorites | ObjectId[] | Yes | References Chat collection |
  | blocked | ObjectId[] | Yes | References User collection |
  | createdAt | Date | Yes | Timestamp |
  | updatedAt | Date | Yes | Timestamp |
```

---

# Generation Rules

1. Preserve schema field order
2. Generate one table per model
3. Include Markdown table headers for every model
4. Keep formatting consistent
5. Preserve capitalization
6. Always use pipe table syntax
7. Do not include empty models
8. Use readable descriptions
9. Detect arrays correctly
10. Detect references correctly
11. Detect timestamps automatically
12. Detect conditional required rules
13. Include nullable union types when available

---

# Recommended Workflow

1. Read all files inside `/backend/src/models/`
2. Locate exported Mongoose schemas
3. Extract schema fields
4. Infer field types
5. Determine required state
6. Generate descriptions
7. Append timestamps if enabled
8. Output grouped Markdown sections

---

# Final Output Requirements

The generated Markdown should:

- Be valid `.md`
- Be easy to paste into `README.md`
- Use consistent spacing
- Avoid trailing whitespace
- Preserve schema ordering
- Preserve naming consistency

---

# Combined Documentation Capability

This skill now supports generating:

1. API route documentation from Postman collections
2. Database model documentation from Mongoose schemas

Both outputs should use:

- Markdown headings
- Markdown tables
- Consistent formatting
- Readable spacing
- Developer-friendly structure
