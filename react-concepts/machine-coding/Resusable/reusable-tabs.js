import React, { useState } from "react";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Tabs</h2>

      <Tabs>
        <Tab label="Home">
          Home content here...
        </Tab>

        <Tab label="About">
          About content here...
        </Tab>

        <Tab label="Contact">
          Contact content here...
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;

//
// ---- SIMPLE TABS COMPONENT ----
//

function Tabs({ children }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* TAB BUTTONS */}
      <div style={{ display: "flex", gap: 10 }}>
        {children.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            style={{
              padding: "8px 16px",
              background: active === index ? "#ddd" : "#f5f5f5",
              border: "1px solid #ccc",
              cursor: "pointer",
            }}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div style={{ marginTop: 15 }}>
        {children[active]}
      </div>
    </div>
  );
}

function Tab({ children }) {
  return <div>{children}</div>;
}
