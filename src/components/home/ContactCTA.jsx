import React from 'react'

const ContactCTA = () => {
  return (
    <div className='contact-cta-wrapper'>
      <div className='contact-cta-content flex flex-col justify-center items-center gap-6'>
        {/* <div> */}
        <h3 className='contact-cta-title'>
          For further rudraksha guidance & details and for astrological and Vastu guidance, get in touch.
        </h3>
        {/* </div> */}
        < a href='/contact' className='contact-cta-btn glass-effect-card'>

          Contact Us

        </a>
      </div>

    </div>
  )
}

export default ContactCTA