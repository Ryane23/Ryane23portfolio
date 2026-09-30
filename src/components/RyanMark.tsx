type RyanMarkProps = {
  className?: string;
  animated?: boolean;
  title?: string;
};

const RyanMark = ({ className = "", animated = false, title = "Ryan Erick" }: RyanMarkProps) => (
  <svg
    viewBox="0 0 72 72"
    className={className}
    role="img"
    aria-label={`${title} monogram`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className={animated ? "mark-stroke mark-stroke-a" : ""}
      d="M12 60V12H36C46 12 52 18 52 27C52 36 46 41 36 41H12M34 41L55 60"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <path
      className={animated ? "mark-stroke mark-stroke-b" : ""}
      d="M60 12H42M60 36H50M60 60H55"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
    />
    <path d="M6 6H18M6 6V18M66 54V66H54" stroke="currentColor" strokeWidth="1" opacity="0.45" />
  </svg>
);

export default RyanMark;
