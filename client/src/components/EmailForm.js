import React, {useRef, useState} from 'react'
import templates from '../phishing_template.json'
//import axios from 'axios'
import '../style.css'
import {useToast} from "../toast";
//import {sendEmail} from "../Api";

const EmailForm = () => {
    const toast = useToast();
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [senderName, setSenderName] = useState('')
    const [senderEmail, setSenderEmail] = useState('')
    const [recipientName, setRecipientName] = useState('')
    const [recipientEmail, setRecipientEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [html, setHtml] = useState('')
    const [htmlLinkText, setHtmlLinkText] = useState('')
    const sendEmailButton = useRef()

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
        //setSelectedTemplate(null)
        setSenderName('')
        setSenderEmail('')
        setRecipientName('')
        setRecipientEmail('')
        setSubject('')
        setText('')
        setHtml('')
        setHtmlLinkText('')
    }

    const validateInputs = () => {
        const missing = []
        if (!senderName.trim()) missing.push('Sender Name')
        if (!senderEmail.trim()) missing.push('Sender Email')
        if (!recipientName.trim()) missing.push('Recipient Name')
        if (!recipientEmail.trim()) missing.push('Recipient Email')
        if (!subject.trim()) missing.push('Subject')
        if (!text.trim()) missing.push('Text')
        if (!html.trim()) missing.push('HTML')
        if (!htmlLinkText.trim()) missing.push('HTML Link Text')
        if (missing.length) {
            toast.open('fail', `Missing fields: ${missing.join(', ')}`, reEnableSendEmailButton)
            return false
        }
        return true
    }

    const validateAndSend = async (ev) => {
        ev.preventDefault()
        sendEmailButton.current.disabled = true
        if (validateInputs()){
            console.log('valid email form')
            await sendPhishingEmail()
        } else {
            console.log('invalid email form')
        }
    }

    const reEnableSendEmailButton = () => sendEmailButton.current.disabled = false

    const sendPhishingEmail = async () => {
        const success = 'Successfully sent phishing email'
        const fail = 'Failed to send phishing email'
        //const res = await sendEmail(senderName, senderEmail, recipientName, recipientEmail, subject, text, html, htmlLinkText)
        //res.status === 200 && res.data.success ? toast.success(success, toastProps) :
            // toast.warn(fail, toastProps);
        setTimeout(() => toast.open('success', success, reEnableSendEmailButton ), 2000);
    }

    const onSelectTemplate = (value) => {
        if (value === 'select'){
            setSelectedTemplate(null)
        } else {
            setSelectedTemplate(value)
        }
    }


    return (
        <>
            <h3>Phishing Form Page</h3>
            <div className="form-container">
                <div className='template-selection'>
                    <select onChange={(ev) => onSelectTemplate(ev.target.value)} defaultValue={"select"}>
                        <option value="select">Select a template</option>
                        <option value="amazon">Amazon</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                    </select>
                    <button disabled={!selectedTemplate} onClick={loadTemplate}>Load</button>
                </div>

            <form className="phishing-form">
                <div className="form-section">
                    <label htmlFor="sender-name">Sender Name</label>
                    <input type="text" id="sender-name" name="sender-name" placeholder="Sender name" value={senderName} onChange={(ev) => setSenderName(ev.target.value)}/>

                    <label htmlFor="sender-email">Sender Email</label>
                    <input type="text" id="sender-email" name="sender-email" placeholder="Sender email" value={senderEmail} onChange={(ev) => setSenderEmail(ev.target.value)}/>
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

                <button ref={sendEmailButton} onClick={(ev) => validateAndSend(ev)}>Send email</button>
                <button onClick={(ev) => clearForm(ev)}>Clear form</button>
            </form>
        </div>
        </>)
}

export default EmailForm;