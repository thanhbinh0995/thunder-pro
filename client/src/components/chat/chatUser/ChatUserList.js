import React from 'react';
import UserCell from "./UserCell";

const ChatUserList = ({user, groups, selectedSectionId, onSelectUser, onlineUsers}) => {
    return (
        <div className="chat-user">
            {groups.map((group, index) =>
                <UserCell
                    key={group.id}
                    user={user}
                    group={group}
                    selectedSectionId={selectedSectionId}
                    onSelectUser={onSelectUser}
                    onlineUsers={onlineUsers}
                />
            )}
        </div>
    );
};

export default ChatUserList;