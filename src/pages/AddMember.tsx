import React, { useEffect, useState } from "react";

const AddMember: React.FC = () => {
  const [memberName, setMemberName] = useState<string>("");

  useEffect(() => {
    const backButton = window.Telegram.WebApp.BackButton;
    backButton.show(); // Show back button for navigation
    return () => backButton.hide(); // Clean up when navigating away
  }, []);

  const handleAddMember = () => {
    // Send member data back to Telegram bot
    window.Telegram.WebApp.sendData(JSON.stringify({ memberName }));
  };

  return (
    <div>
      <h1>Add Member</h1>
      <input type="text" placeholder="Enter member name" value={memberName} onChange={(e) => setMemberName(e.target.value)} />
      <button onClick={handleAddMember}>Add Member</button>
    </div>
  );
};

export default AddMember;
