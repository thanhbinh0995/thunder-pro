import React from "react";
import ReactAvatarEditor from "react-avatar-editor";
import Dropzone from "react-dropzone";
export default class ImageAvatar extends React.Component {
    state = {
        image: this.props.avatar,
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 520,
        height: 520,
    };

    convertBase64ToFile = (image) => {
        const byteString = atob(image.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], {
            type: 'image/jpeg',
        });
    };

    handleNewImage = e => {
        this.setState({image: e.target.files[0]})
    };

    handleSave = data => {
        const img = this.editor.getImageScaledToCanvas().toDataURL();
        const rect = this.editor.getCroppingRect();
        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this.state.borderRadius,
            },
        });
        const image = this.convertBase64ToFile(img);
        this.props.setAvatar(image);
    };

    handleScale = e => {
        const scale = parseFloat(e.target.value);
        this.setState({scale})
    };

    rotateLeft = e => {
        e.preventDefault();

        this.setState({
            rotate: this.state.rotate - 90,
        })
    };

    rotateRight = e => {
        e.preventDefault();
        this.setState({
            rotate: this.state.rotate + 90,
        })
    };

    logCallback(e) {
        console.log('callback', e)
    }

    setEditorRef = editor => {
        if (editor) this.editor = editor
    };

    handlePositionChange = position => {
        this.setState({position})
    };

    handleDrop = acceptedFiles => {
        this.setState({image: acceptedFiles[0]})
    };

    render() {
        const {image} = this.state;
        return (
            <div>
                <Dropzone
                    onDrop={this.handleDrop}
                    disableClick
                    multiple={false}
                    style={{width: this.state.width, height: this.state.height, marginBottom: '35px'}}
                >
                    <div>
                        <ReactAvatarEditor
                            ref={this.setEditorRef}
                            scale={parseFloat(this.state.scale)}
                            width={this.state.width}
                            height={this.state.height}
                            position={this.state.position}
                            onPositionChange={this.handlePositionChange}
                            rotate={parseFloat(this.state.rotate)}
                            borderRadius={this.state.borderRadius}
                            onSave={this.handleSave}
                            onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                            onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                            onImageReady={this.logCallback.bind(this, 'onImageReady')}
                            onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
                            image={image}
                        />
                    </div>
                </Dropzone>
                <br />
                New File:
                <input name="newImage" type="file" onChange={this.handleNewImage}/>
                <br />
                Zoom:
                <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
                <br />
                Rotate:
                <button onClick={this.rotateLeft}>Left</button>
                <button onClick={this.rotateRight}>Right</button>
                <br />
                <br />
                <input type="button" onClick={this.handleSave} value="Preview"/>
                <br />
                {!!this.state.preview && (
                    <img
                        src={this.state.preview.img}
                        style={{
                            borderRadius: `${(Math.min(
                                this.state.preview.height,
                                this.state.preview.width
                            ) +
                            10) *
                            (this.state.preview.borderRadius / 2 / 100)}px`,
                        }}
                    />
                )}
            </div>
        )
    }
}
