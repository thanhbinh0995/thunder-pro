import React from "react";
import moment from "moment";
import {SERVER_URL} from '../../../constants'
const UserCell = ({user, group, selectedSectionId, onSelectUser, onlineUsers}) => {
    const groupSplit = group.nameId.split("/");
    const friendId = groupSplit[0] === user.id ? groupSplit[1] : groupSplit[0];
    const groupImageSplit = group.image.split("/");
    const image = groupImageSplit[0] === user.avatar ? groupImageSplit[1] : groupImageSplit[0];
    const isOnline = onlineUsers.indexOf(friendId) > -1;
    return (
        <div className={`chat-user-item ${selectedSectionId === group.id ? 'active' : ''}`} onClick={() => {
            onSelectUser(group);
        }}>
            <div className="chat-user-row row">
                <div className="chat-avatar col-xl-2 col-3">
                    <div className="chat-avatar-mode">
                        <img src={SERVER_URL + image}
                             className="rounded-circle size-40" alt="Domnic Brown"/>
                        <span className={`chat-mode small ${isOnline ? 'online' : 'offline'}`}/>
                    </div>
                </div>

                <div className="chat-info col-xl-8 col-6">
                    <p className="name h4">{group.name.split("-").map((item, index) =>
                        item !== user.username ? <span key={index}>{item}</span> : null
                    )}</p>
                    <div className="chat-info-des">{group.lastMessage ? group.lastMessage.substring(0, 25) : null}</div>
                    <div
                        className="last-message-time">{group.lastMessageTime && moment(group.lastMessageTime).format("hh:mm:ss A")}
                        </div>
                </div>

                <div className="chat-date col-xl-2 col-3">
                    <div className="bg-primary rounded-circle badge text-white">3</div>
                </div>
            </div>
        </div>
    )
};

export default UserCell;
