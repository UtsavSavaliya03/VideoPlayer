import React from "react";
import './Css/Uploads.css'
import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import ReactTagInput from "@pathofdev/react-tag-input";

/* ----------- import css ----------- */
import 'react-toastify/dist/ReactToastify.css';
import "@pathofdev/react-tag-input/build/index.css";


class Uploads extends React.Component {

    state = {
        selectedVideo: null,
        selectedThumbnail: null,
        videoFileName: 'No file chosen',
        thumbnailFileName: 'No file chosen',
        videoName: '',
        description: '',
        category: '',
        visibility: '',
        tags: [],
        uploadedPercentage: 0,
    }
    uploadVideo = () => {
        document.getElementById("selectVideo").click()
    }

    uploadThumbnail = () => {
        document.getElementById("selectThumbnail").click()
    }

    getValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value });
    }

    displayAlert = (type, alertMsg) => {
        if (type == true) {
            toast.success(alertMsg, {
                position: "top-center"
            })
        } else {
            toast.error(alertMsg, {
                position: "top-center"
            })
        }
    }

    maxSelectFile(event) {
        let files = event.target.files;
        if (files.length > 1) {
            toast.error('Maximum 1 file is allowed');
            event.target.value = null;
            return false;
        }
        return true;
    }

    fileChangeHandler(event) {
        const file = event.target.files[0];
        if (file != null) {
            const fileType = file.type.substr(0, 5);

            if (fileType == "video") {
                if (this.maxSelectFile(event)) {
                    this.setState({
                        selectedVideo: file,
                        videoFileName: file.name
                    });
                }
            } else {
                if (this.maxSelectFile(event)) {
                    this.setState({
                        selectedThumbnail: file,
                        thumbnailFileName: file.name
                    });
                }
            }
        }
    }

    async fileUploadHandler(event) {

        const user_id = localStorage.getItem('user_id');
        const formData = new FormData();

        formData.append("user_id", user_id);
        formData.append("channel_id", "Enter Channel Id");
        formData.append("file", this.state.selectedVideo);
        formData.append("file", this.state.selectedThumbnail);
        formData.append("videoName", this.state.videoName);
        formData.append("description", this.state.description);
        formData.append("category", this.state.category);
        formData.append("visibility", this.state.visibility);
        formData.append("tags", this.state.tags);

        const progress = {
            onUploadProgress: ProgressEvent => {
                const { loaded, total } = ProgressEvent;
                let percent = Math.floor(loaded * 100 / total);
                console.log(`${loaded} kb of ${total}  |  ${percent}%`);

                if (percent < 100) {
                    this.setState({ uploadedPercentage: percent });
                }
            } 
        }


        const data = await axios.post('http://localhost:3000/uploadVideo', formData, progress).then(res => {
            this.setState({ uploadedPercentage: 100 }, () => {
                setTimeout(() => {
                    this.setState({ uploadedPercentage: 0 })
                }, 1000);
            })
            return res.data
        }).catch((error) => {
            return error
        });
        this.displayAlert(data.status, data.msg);
    }

    render() {
        const { uploadedPercentage } = this.state;

        return (
            <>
                <div className="container-fluid">
                    <div className="form-group">
                        <ToastContainer />
                    </div>
                    <h4>Upload Video</h4>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="form-group files col-6">
                            <label>Upload Your Video Here</label>
                            <button className="input-btn" onClick={this.uploadVideo}>
                                <p className="file-name">{this.state.videoFileName}</p>
                            </button>
                            <input
                                id="selectVideo"
                                hidden
                                type="file"
                                name="videoFile"
                                className="form-control"
                                multiple="multiple"
                                accept="video/*"
                                onChange={this.fileChangeHandler.bind(this)}
                                required
                            />
                        </div>
                        <div className="form-group files col-6">
                            <label>Upload Your Thumbnail Image Here</label>
                            <button className="input-btn" onClick={this.uploadThumbnail}>
                                <p className="file-name">{this.state.thumbnailFileName}</p>
                            </button>
                            <input
                                id="selectThumbnail"
                                hidden
                                type="file"
                                name="thumbnailFile"
                                className="form-control"
                                multiple="multiple"
                                accept="image/*"
                                onChange={this.fileChangeHandler.bind(this)}
                                required
                            />
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="row">
                        <div className="form-group col-12">
                            <input
                                className="input"
                                type="text"
                                name="videoName"
                                placeholder="Title"
                                onChange={this.getValue}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-12">
                            <textarea
                                className="text-area"
                                name="description"
                                rows="7"
                                placeholder="Description..."
                                onChange={this.getValue}
                                required
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <input
                                className="input"
                                list="category-list"
                                id="category"
                                name="category"
                                placeholder="Category"
                                onChange={this.getValue}
                                required
                            />
                            <datalist id="category-list">
                                <option value="Art">Art</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Health">Health</option>
                                <option value="Motivation">Motivation</option>
                                <option value="Others">Others</option>
                                <option value="Science">Science</option>
                            </datalist>
                        </div>
                        <div className="form-group col-6">
                            <input
                                className="input"
                                list="visibility-list"
                                id="visibility"
                                name="visibility"
                                placeholder="Visibility"
                                onChange={this.getValue}
                                required
                            />
                            <datalist id="visibility-list">
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </datalist>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ReactTagInput
                                tags={this.state.tags}
                                onChange={(newTags) => this.setState({ tags: newTags })}
                                placeholder="Add tags...  (Type and press enter)"
                            />
                        </div>
                    </div>
                    <div>
                        {uploadedPercentage > 0 && <ProgressBar now={uploadedPercentage} animated label={` Uploading... ${uploadedPercentage} %`} className="my-4" />}
                        <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={this.fileUploadHandler.bind(this)}
                        > Upload Video
                        </button>
                    </div>
                </div>
            </>
        );
    }
}

export default Uploads;