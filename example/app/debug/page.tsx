import { UseDebugContractsExample } from "../components/UseDebugContractsExample";
import "@scaffold-ui/debug-contracts/styles.css";

export default function DebugContracts() {
  return (
    <div className="min-h-screen bg-[var(--color-sui-primary-neutral)]">
      <UseDebugContractsExample />
    </div>
  );
}
