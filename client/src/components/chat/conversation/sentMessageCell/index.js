import React from 'react';
import moment from "moment";

const SentMessageCell = ({conversation}) => {
    const time = moment(conversation.createdAt).format('hh:mm:ss A');
    return (
        <div className="d-flex flex-nowrap chat-item flex-row-reverse">
            <div className="bubble jambo-card">
                <div className="message">{conversation.message.split("\n").map((item, index) =>
                    <p key={index}>
                        {item}
                    </p>
                )}</div>
            </div>

        </div>
    )
};

export default SentMessageCell;