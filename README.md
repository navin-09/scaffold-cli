# Scaffold CLI

A lightweight scaffolding CLI tool for bootstrapping projects with configurable templates.

## Features

- **Template scaffolding** — start new projects from templates via `scaffold start`
- **Config-driven** — uses `cosmiconfig` to discover project configuration (supports `.toolrc`, `tool.config.js`, `package.json#tool`)
- **Validation** — validates config against a JSON schema using `ajv` with human-readable error messages
- **Debug mode** — built-in debug logging for troubleshooting
- **Colored output** — chalk-powered terminal UI

## Usage

```bash
$ ./tool/bin/index.js start <project-name> [options]
```

## Dependencies

| Package | Purpose |
|---------|---------|
| `ajv` / `better-ajv-errors` | JSON schema validation with friendly error messages |
| `cosmiconfig` | Config file discovery from multiple sources |
| `arg` | CLI argument parsing |
| `chalk` | Colored terminal output |
| `debug` | Namespaced debug logging |
| `pkg-up` | Find nearest `package.json` |

## How it works

1. **Config resolution** — `config-mgr.js` discovers and validates project config using `cosmiconfig` + `ajv`
2. **Command routing** — `bin/index.js` parses args with `arg` and dispatches to commands
3. **Execution** — commands (e.g. `start`) scaffold project files based on resolved config

## Project Structure

```
tool/
├── bin/
│   └── index.js          # CLI entry point
├── src/
│   ├── commands/
│   │   └── start.js      # Scaffold command
│   ├── config/
│   │   ├── config-mgr.js # Config discovery & validation
│   │   └── schema.json   # JSON validation schema
│   └── logger.js         # Debug/colored logging
└── package.json
```
