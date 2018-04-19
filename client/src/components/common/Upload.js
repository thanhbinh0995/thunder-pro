import React from 'react';

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadStatus: false
        }
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0]
    };

    uploadHandler = () => {
        console.log(this.state.selectedFile)
    };

    render() {
        return(
            <div className="container">
                <input type="file" onChange={this.fileChangedHandler} />
                    <button onClick={this.uploadHandler}>Upload!</button>
            </div>
        )
    }
}