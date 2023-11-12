// src/components/MemberList.js
import React from 'react';

const MemberList = ({ members, isOwner, onRemoveMemberClick }) => {
  return (
    <div>
      <h3>Members</h3>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name} {isOwner && <button onClick={() => onRemoveMemberClick(member.id)}>Remove</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;