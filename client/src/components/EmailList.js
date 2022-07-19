import React, {useState} from "react"
import dummyData from '../dummyData'
import skull from '../assets/white-skull.png'
import safe from '../assets/safe.png'
import '../style.css'

const EmailList = () => {
    const [emails, setEmails] = useState(dummyData)
    console.log('emailList :: emails:', emails)
    return (
        <>
            <h3>View Sent Emails Page</h3>
            <div className='sent-emails'>
            {emails.map((email, idx) =>
                <Email key={`email_${idx}`} content={email}/>)}
        </div>
        </>
    )
}

const emailStyle = {
    //backgroundColor: '#4e496b',
    backgroundColor: 'rgb(62, 68, 98)',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    maxWidth: '300px',
    margin: '15px auto',
    textAlign: 'center',
    // fontFamily: 'arial'
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
    boxSizing: 'border-box',
    fontSize: '18px'
}

const imgStyle = {
    width: '40px',
    height: '40px',
    margin: '10px 0'
}

const sectionTitleStyle = {
    paddingTop: '10px',
    color: '#a89eed'
}

const Email = ({content}) => {
    const {status, to, from} = content
    return <div className='email'>
        <div style={sectionTitleStyle}>From:</div>
        <p>{from.name} {from.email}</p>
        <div style={sectionTitleStyle}>To:</div>
        <p>{to.name} {to.email}</p>
        <img src={status === 'CLICKED' ? skull : safe} style={imgStyle}/>
        <div style={statusStyle}>Status: {status}</div>
    </div>
}

export default EmailList
