import React from "react";
import moment from "moment";
const ReceivedMessageCell = ({conversation, isLastMessage}) => {
    const time = moment(conversation.createdAt).format('hh:mm:ss A');
    return (
        <div className="d-flex flex-nowrap chat-item">
            {
                isLastMessage &&
                <img className="rounded-circle avatar size-40 align-self-end"
                     src="http://demo.g-axon.com/jumbo-react/assets/images/userAvatar/domnic-brown.png"
                     alt=""/>
            }
            <div className={`bubble bubble-left ${!isLastMessage ? "mr56" : null}`}>
                <div className="message">{conversation.message.split("\n").map((item, index) =>
                    <p key={index}>
                        {item}
                    </p>
                )}</div>
            </div>

        </div>
    )
};

export default ReceivedMessageCell;