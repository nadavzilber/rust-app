import React, {useState} from "react"
import fakeEmails from '../../fakeEmails'
import skull from '../../assets/white-skull.png'
import safe from '../../assets/safe.png'

const EmailList = () => {
    const [emails, setEmails] = useState(fakeEmails)
    console.log('emailList :: emails:', emails)
    return (
        <div>
            <h3>View Sent Emails Page</h3>
            {emails.map((email, idx) =>
                <Email key={`email_${idx}`} content={email}/>)}
        </div>
    )
}

const emailStyle = {
    backgroundColor: '#4e496b',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
    margin: '15px auto',
    textAlign: 'center',
    fontFamily: 'arial'
}

const statusStyle = {
    border: 'none',
    outline: 0,
    display: 'inline-block',
    padding: '8px',
    color: 'white',
    backgroundColor: '#000',
    textAlign: 'center',
    width: '100%',
    fontSize: '18px'
}

const imgStyle = {
    width: '50px',
    margin: '10px 0'
}

const sectionTitleStyle = {
    paddingTop: '10px',
    color: '#a89eed'
}

const Email = ({content}) => {
    const {status, to, from} = content
    return <div style={emailStyle}>
        <div style={sectionTitleStyle}>From:</div>
        <p>{from.name} {from.email}</p>
        <div style={sectionTitleStyle}>To:</div>
        <p>{to.name} {to.email}</p>
        <img src={status === 'CLICKED' ? skull : safe} style={imgStyle}/>
        <div style={statusStyle}>Status: {status}</div>
    </div>
}

export default EmailList
