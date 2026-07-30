import React from 'react'

const ContactCTA = () => {
  return (
    <div className='contact-cta-wrapper'>
      <div className='contact-cta-content flex flex-col justify-center items-center gap-6'>
        {/* <div> */}
        <h3 className='contact-cta-title'>
          For further guidance in this regard and for astrological and Vastu guidance, you can contact us.
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