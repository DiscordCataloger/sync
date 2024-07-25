// Component for "Required" in red
const Required = ({ error }) => {
  return (
    <div className="inline-flex justify-around text-[#c91202] mx-[10px] md:mx-[12px] text-[10px] md:text-[12px] h-[10px] md:h-[12px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-message-square-warning w-full h-auto"
        preserveAspectRatio="xMinYMin meet"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M12 7v2" />
        <path d="M12 13h.01" />
      </svg>
      <p className="mx-[2px] md:mx-[6px] whitespace-nowrap">{error}</p>
    </div>
  );
};
export default Required;
