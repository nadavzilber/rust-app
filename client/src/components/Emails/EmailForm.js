import React, {useRef, useState} from 'react'
import templates from '../../phishing_template.json'
//import axios from 'axios'
import '../../style.css'
import {useToast} from "../../toast";
import {TooltipLabel} from "../TooltipLabel";
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
    const [isLoading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        ev.preventDefault()
        sendEmailButton.current.disabled = true
        if (validateInputs()){
            console.log('valid email form')
            await sendPhishingEmail()
        } else {
            console.log('invalid email form')
            sendEmailButton.current.disabled = false
            setIsLoading(false)
        }
    }

    const reEnableSendEmailButton = () => sendEmailButton.current.disabled = false

    const sendPhishingEmail = async () => {
        const success = 'Successfully sent phishing email'
        const fail = 'Failed sending phishing email'
        //const res = await sendEmail(senderName, senderEmail, recipientName, recipientEmail, subject, text, html, htmlLinkText)
        const randomNum = Math.floor(Math.random() * 10) + 1;
        const isSuccessful = randomNum > 5
        const toastProps = []
        isSuccessful ? toastProps.push('success', success) : toastProps.push('fail', fail)
        toastProps.push(reEnableSendEmailButton)
        console.log('randomNum:',randomNum,'isSuccessful?',isSuccessful,'toastProps:',toastProps)
        setTimeout(() => {
            setIsLoading(false)
            toast.open(...toastProps)
        }, 2000);
    }

    const onSelectTemplate = (value) => {
        if (value === 'select'){
            setSelectedTemplate(null)
        } else {
            setSelectedTemplate(value)
        }
    }


    return (
        <div>
            <h3>Phishing Form Page</h3>
            {isLoading && <div className="loader"></div>}
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

                    <div className="form-section">
                        {/*<label htmlFor="subject">Subject</label>*/}
                        <TooltipLabel tooltip={`The email's subject line`} htmlFor={"subject"}>Subject</TooltipLabel>
                        <input type="text" id="subject" name="subject" placeholder="Subject" value={subject} onChange={(ev) => setSubject(ev.target.value)}/>

                        {/*<label htmlFor="text">Text</label>*/}
                        <TooltipLabel tooltip={`The email's text content`} htmlFor={"text"}>Text</TooltipLabel>
                        <textarea id="text" name="text" placeholder="Write something.." value={text} onChange={(ev) => setText(ev.target.value)}/>

                        {/*<label htmlFor="html">HTML</label>*/}
                        <TooltipLabel tooltip={'HTML containing a malicious link, {{maliciousLink}} will be added automatically'} htmlFor={"html"}>HTML</TooltipLabel>
                        <textarea id="html" name="html" placeholder="Write something.." value={html} onChange={(ev) => setHtml(ev.target.value)}/>

                        {/*<label htmlFor="html-link-text">HTML Link Text</label>*/}
                        <TooltipLabel tooltip={'A call to action'} htmlFor={"html-link-text"}>HTML Link Text</TooltipLabel>
                        <input type="text" id="html-link-text" name="html-link-text" placeholder="View details / Change password / Review" value={htmlLinkText} onChange={(ev) => setHtmlLinkText(ev.target.value)}/>
                    </div>

                    <button ref={sendEmailButton} onClick={(ev) => validateAndSend(ev)}>Send email</button>
                    <button onClick={(ev) => clearForm(ev)}>Clear form</button>
                </form>
            </div>
        </div>)
}

export default EmailForm;