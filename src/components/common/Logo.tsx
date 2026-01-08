import DapupLogo from "../../assets/DapupLogo.png";

// Kept in case anything else imports these
export const GOLD_FROM = "#B58A3B";
export const GOLD_TO = "#4F3C1A";

/**
 * Square logo mark (uses the PNG).
 * @param {Object} props - Component props
 * @param {number} [props.size=56] - Size of the logo in pixels
 */
export function LogoMark({ size = 56 }: { size?: number }) {
  return (
    <img
      src={DapupLogo}
      alt="DapUp logo"
      style={{ width: size, height: size }}
      className="object-contain select-none"
      draggable={false}
    />
  );
}

/**
 * Wordmark logo (renders the PNG), optionally inside a black badge like the login screen.
 * @param {Object} props - Component props
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Size of the logo
 * @param {boolean} [props.withBadge=true] - Whether to show the logo with a badge background
 */
export function LogoWordmark({
  size = "md",
  withBadge = true,
}: {
  size?: "sm" | "md" | "lg";
  withBadge?: boolean;
}) {
  const heightBySize: Record<"sm" | "md" | "lg", number> = {
    sm: 24,
    md: 40,
    lg: 64,
  };

  const padBySize: Record<"sm" | "md" | "lg", string> = {
    sm: "px-2 py-[4px]",
    md: "px-4 py-[10px]",
    lg: "px-6 py-[14px]",
  };

  const img = (
    <img
      src={DapupLogo}
      alt="DapUp"
      style={{ height: heightBySize[size], width: "auto" }}
      className="block object-contain select-none"
      draggable={false}
    />
  );

  if (!withBadge) return img;

  return (
    <div className={`inline-flex items-center rounded-md bg-[#0B0B0B] ${padBySize[size]}`}>
      {img}
    </div>
  );
}

/**
 * Default Logo component for general use
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes (currently unused, reserved for future use)
 */
export default function Logo({ className: _className = "h-8 w-auto", ...props }) {
  return (
    <LogoWordmark
      size="md"
      withBadge={false}
      {...props}
    />
  );
}