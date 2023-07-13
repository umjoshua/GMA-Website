import SendEmail from "./mail.js";

export const MembershipRegister = async (req, res) => {
    const text = `
    <b>Applicant Information: </b>
    First Name: ${req.body.fname ? req.body.fname : 'NA'}
    Middle Name: ${req.body.mname ? req.body.mname : 'NA'}
    Last Name: ${req.body.lname ? req.body.lname : 'NA'}

    Address:
    Address Line 1: ${req.body.address1 ? req.body.address1 : 'NA'}
    Address Line 2: ${req.body.address2 ? req.body.address2 : 'NA'}
    Suburb: ${req.body.suburb ? req.body.suburb : 'NA'}
    State: ${req.body.state ? req.body.state : 'NA'}
    Post Code: ${req.body.postCode ? req.body.postCode : 'NA'}
    Country: ${req.body.country ? req.body.country : 'NA'}
    Area Code: ${req.body.areaCode ? req.body.areaCode : 'NA'}
    
    Phone Number: ${req.body.phNo ? req.body.phNo : 'NA'}
    
    Email: ${req.body.email ? req.body.email : 'NA'}
    
    Gender: ${req.body.gender ? req.body.gender : 'NA'}
    
    Age: ${req.body.age ? req.body.age : 'NA'}
    
    Blood Group: ${req.body.bloodGroup ? req.body.bloodGroup : 'NA'}
    
    Emergency Contact Details in Kerala / India:
    First Name: ${req.body.keralaContactfname ? req.body.keralaContactfname : 'NA'}
    Last Name: ${req.body.keralaContactlname ? req.body.keralaContactlname : 'NA'}
    Phone Number: ${req.body.keralaContactphNo ? req.body.keralaContactphNo : 'NA'}

    Name of Spouce:
    First Name: ${req.body.spouceFname ? req.body.spouceFname : 'NA'}
    Middle Name: ${req.body.spouceMname ? req.body.spouceMname : 'NA'}
    Last Name: ${req.body.spouceLname ? req.body.spouceLname : 'NA'}
    Phone Number: ${req.body.spoucePhNo ? req.body.spoucePhNo : 'NA'}
    Email: ${req.body.spouceEmail ? req.body.spouceEmail : 'NA'}

    Details of other family members in your household and kids under 13 years:
    ${req.body.familyDetails ? req.body.familyDetails : 'NA'}

    Preferred Method of contact:
    ${req.body.contactMethod ? req.body.contactMethod : 'NA'}

    Type of membership:
    ${req.body.membershipType ? req.body.membershipType : 'NA'}

    Membership fee paid?
    ${req.body.membershipFeePaid ? req.body.membershipFeePaid : 'NA'}
    `
    const data = {
        reciever: process.env.MAIL_RECIEVER,
        subject: "New Membership Registration",
        text,
        attachments: [],
    }
    await SendEmail(data);
    res.status(200).json({ "msg": "success" });
}