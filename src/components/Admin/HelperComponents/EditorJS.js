import React from 'react'
import EditorJS from '@stfy/react-editor.js'
import Paragraph from '@editorjs/paragraph'
import ImageTool from '@editorjs/image';
import {withFirebase} from "../../../Firebase";

class Editor extends React.Component {
    render() {
        const firebase = this.props.firebase;
        return (
            <EditorJS
                autofocus
                holderId="editorjs-container"
                onChange={(data) => this.props.onChange(data)}
                customTools={{
                    inlineToolbar: true,
                    paragraph: {
                        class: Paragraph,
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                uploadByFile(file) {
                                    return firebase.uploadPostImage(file).then((url) => {
                                        return {
                                            success: 1,
                                            file: {
                                                url: url,
                                            }
                                        };
                                    }).catch(()=>{
                                        return {
                                            success: 0,
                                        }
                                    })
                                },
                                uploadByUrl(url) {
                                    return {
                                        success: 1,
                                        file: {
                                            url: url
                                        }
                                    };
                                }
                            }
                        }
                    }
                }}
                data={this.props.data}
            />
        )
    }

}
export default withFirebase(Editor)