import React, {useState} from "react"
import dummyData from '../dummyData'
import '../style.css'
import Email from "./Email";

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

export default EmailList
