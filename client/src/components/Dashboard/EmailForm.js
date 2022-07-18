import React, {useState} from 'react'
import templates from '../../phishing_template.json'
//import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
//import {sendEmail} from "../Api";

const toastProps =  {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}


const EmailForm = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [senderName, setSenderName] = useState('')
    const [senderEmail, setSenderEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [html, setHtml] = useState('')
    const [htmlLinkText, setHtmlLinkText] = useState('')

    const loadTemplate = () => {
        const {senderName, senderEmail, recipientName, recipientEmail, subject, text, html, htmlLinkText} = templates[selectedTemplate]
        setSenderName(senderName)
        setSenderEmail(senderEmail)
        setRecipientName(recipientName)
        setRecipientEmail(recipientEmail)
        setSubject(subject)
        setText(text)
        setHtml(html)
        setHtmlLinkText(htmlLinkText)
    }

    const clearForm = (ev) => {
        ev.preventDefault()
        setSelectedTemplate(null)
        setSenderName('')
        setSenderEmail('')
        setRecipientName('')
        setRecipientEmail('')
        setSubject('')
        setText('')
        setHtml('')
        setHtmlLinkText('')
    }

    const validateAndSend = (ev) => {
        ev.preventDefault()
        if (senderName.trim() && senderEmail.trim() && recipientName.trim() && recipientEmail.trim() &&
            subject.trim() && text.trim() && html.trim()) {
            sendPhishingEmail()
        }
    }

    const sendPhishingEmail = async () => {
        const success = 'Successfully sent phishing email'
        const fail = 'Failed to send phishing email'
        //const res = await sendEmail(senderName, senderEmail, recipientName, recipientEmail, subject, text, html, htmlLinkText)
        //res.status === 200 && res.data.success ? toast.success(success, toastProps) :
            toast.warn(fail, toastProps);
    }

    const onSelectTemplate = (value) => {
        if (value === 'select'){
            setSelectedTemplate(null)
        } else {
            setSelectedTemplate(value)
        }
    }


    return (
        <div className="container">
            {/*<ToastContainer*/}
            {/*    position="top-right"*/}
            {/*    autoClose={5000}*/}
            {/*    hideProgressBar={false}*/}
            {/*    newestOnTop={false}*/}
            {/*    closeOnClick*/}
            {/*    rtl={false}*/}
            {/*    pauseOnFocusLoss*/}
            {/*    draggable*/}
            {/*    pauseOnHover/>*/}
            <h3>Phishing Form</h3>
            <select onChange={(ev) => onSelectTemplate(ev.target.value)} defaultValue={"select"}>
                <option value="select">Select a template</option>
                <option value="amazon">Amazon</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
            </select>
            <button disabled={!selectedTemplate} onClick={loadTemplate}>Load</button>

            <form className="phishing-form">
                <div className="form-section">
                    <label htmlFor="sender-name">Sender Name</label>
                    <input type="text" id="sender-name" name="sender-name" placeholder="Sender name" value={senderName} onChange={(ev) => setSenderName(ev.target.value)}/>

                    <label htmlFor="sender-email">Sender Email</label>
                    <input type="text" id="sender-email" name="sender-email" placeholder="Sender email" value={senderEmail} onChange={(ev) => setSenderName(ev.target.value)}/>
                </div>
                <div className="form-section">
                    <label htmlFor="recipient-email">Recipient Email</label>
                    <input type="text" id="recipient-email" name="recipient-email" placeholder="Recipient email" value={recipientEmail} onChange={(ev) => setRecipientEmail(ev.target.value)}/>

                    <label htmlFor="recipient-name">Recipient Name</label>
                    <input type="text" id="recipient-name" name="recipient-name" placeholder="Recipient name" value={recipientName} onChange={(ev) => setRecipientName(ev.target.value)}/>
                </div>

                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="Subject" value={subject} onChange={(ev) => setSubject(ev.target.value)}/>

                <label htmlFor="text">Text</label>
                <textarea id="text" name="text" placeholder="Write something.." value={text} onChange={(ev) => setText(ev.target.value)}/>

                <label htmlFor="html">HTML</label>
                <textarea id="html" name="html" placeholder="Write something.." value={html} onChange={(ev) => setHtml(ev.target.value)}/>

                <label htmlFor="html-link-text">HTML Link Text</label>
                <input type="text" id="html-link-text" name="html-link-text" placeholder="View details / Change password / Review" value={htmlLinkText} onChange={(ev) => setHtmlLinkText(ev.target.value)}/>

                <button onClick={(ev) => validateAndSend(ev)}>Send email</button>
                <button onClick={(ev) => clearForm(ev)}>Clear form</button>
            </form>
        </div>)
}

export default EmailForm;