import { generateAgentSkillsIndex } from "./gen-agent-skills-index";

// Runs before `vocs dev` / `vocs build` (see package.json). Builds the
// agent-skills discovery index that lives at /.well-known/agent-skills/index.json.
// Vocs v2 emits sitemap.xml / robots.txt / llms.txt natively, so the old
// gen-sitemap step is gone.
generateAgentSkillsIndex();
