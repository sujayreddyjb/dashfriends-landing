const FooterNeonBorder = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top horizontal flowing gradients */}
      <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
        {/* Static glow */}
        <div className="absolute inset-0 bg-[#4F46E5] opacity-20 blur-[2px]" />
        {/* Animated lines */}
        <div className="absolute inset-0 animate-flow-left bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent opacity-70" />
        <div className="absolute inset-0 animate-flow-right bg-gradient-to-r from-transparent via-[#4F46E5] to-transparent opacity-70" />
      </div>

      {/* Left vertical flowing gradient */}
      <div className="absolute top-0 left-0 w-[3px] h-full overflow-hidden">
        {/* Static glow */}
        <div className="absolute inset-0 bg-[#4F46E5] opacity-20 blur-[2px]" />
        {/* Animated line */}
        <div className="absolute inset-0 animate-flow-up bg-gradient-to-b from-transparent via-[#4F46E5] to-transparent opacity-70" />
      </div>

      {/* Right vertical flowing gradient */}
      <div className="absolute top-0 right-0 w-[3px] h-full overflow-hidden">
        {/* Static glow */}
        <div className="absolute inset-0 bg-[#4F46E5] opacity-20 blur-[2px]" />
        {/* Animated line */}
        <div className="absolute inset-0 animate-flow-down bg-gradient-to-b from-transparent via-[#4F46E5] to-transparent opacity-70" />
      </div>
    </div>
  )
}

export default FooterNeonBorder 