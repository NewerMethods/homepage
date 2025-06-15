
import * as React from "react";

const SubstackEmbed = () => {
  return (
    <div className="rounded-lg overflow-hidden border">
        <iframe
        src="https://currentlyspeaking.substack.com/embed"
        width="100%"
        height="320"
        style={{ background: "hsl(var(--card))" }}
        frameBorder="0"
        scrolling="no"
        ></iframe>
    </div>
  );
};

export default SubstackEmbed;
