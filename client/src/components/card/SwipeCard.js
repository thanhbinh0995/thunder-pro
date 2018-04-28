import React from "react";
import {action} from "@kadira/storybook";
import Cards from "./Cards";
import Card from "./CardSwitcher";
import moment from "moment";

const displayLeft = false;
const displayRight = false;
const displayTop = false;


class SwipeCard extends React.Component {

    constructor(props) {
        super(props);
        this.haha = "fd";
        this.state = {
            users: [],
            active: {
                left: false,
                right: false,
                top: false,
            }
        }
    }

    getAgeFromBirthday(date) {
        return moment().diff(date, 'years');
    }

    render() {
        let users = this.props.users;
        return (
            <div>
                <Cards
                    onEnd={action('end')}
                    requestLikeFriend={this.props.requestLikeFriend}
                    className='master-root'>
                    {users.map((user, key) =>
                        <Card
                            key={key}
                            user={user}
                            avatar={user.avatar}
                            onSwipeLeft={action('swipe left')}
                            onSwipeRight={action('swipe right')}
                            onSwipeTop={action('swipe top')}
                            onSendMessage={this.props.onSendMessage}
                            requestMoreUser={this.props.requestMoreUser}
                        >
                            <h2 className="username">{user.username}, <span>{this.getAgeFromBirthday(user.birthday)}</span></h2>
                            <h5 className="distance">{Math.round(user.distance)} km</h5>
                        </Card>
                    )}
                </Cards>
            </div>
        );
    }
}
export default SwipeCard;
