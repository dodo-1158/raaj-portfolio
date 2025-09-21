// "use client";
// import { useState } from "react";
// import styles from "./contact.module.css";
// import Image from "next/image";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Link from 'next/link';


// export default function ContactPage() {
//   const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const validate = () => {
//     let newErrors = {};
//     if (!form.name) newErrors.name = "Name is required";
//     if (!form.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
//       newErrors.email = "Invalid email";
//     }
//     if (!form.message) newErrors.message = "Message is required";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       setSubmitted(true);
//       console.log("Form Submitted:", form);
//     }
//   };

//   return (
// <>
// <nav className={styles.navbar}>
     
//         <div >
//           <div>
//             <Link href="/">
//             <Image src="/Raaj-Logo1.png" alt="Logo"  width={150}   // set width in px
//   height={0}   
//   style={{ height: "auto" }}  />
//   </Link>
//           </div>
          
//         </div>
        
        
// <div className={styles.navLinks}>
//   <Link href="/#about" className={styles.navLink}>ABOUT ME</Link>
//   <Link href="/#work" className={styles.navLink}>MY WORK</Link>
//   <Link href="/#gallery" className={styles.navLink}>GALLERY</Link>
//   <Link href="/#contact" className={styles.navLink}>CONTACT ME</Link>
// </div>
//       </nav>

// <div className={styles.contactPage}>
//   <div className={styles.contactContainer}>
//   <div className={styles.contactContainer}>
//       <h1 className={styles.heading}>Contact detail</h1>
//       <p className={styles.subheading}>
//         HAVE A NEW PROJECT? WE’D LOVE TO HEAR FROM YOU
//       </p>

//       <div className={styles.card1} onClick={() => window.open('mailto:raajdhoundiyal@gmail.com')}>
//   <span className={styles.icon}><i className="fas fa-envelope"></i></span>
//   <h3>Gmail</h3>
//   <p>raajdhoundiyal@gmail.com</p>
// </div>


//       <div className={styles.card2}>
//       <span className={styles.icon}><i className="fas fa-phone"></i></span>
//         <h3>Phone Number</h3>
//         <p>+91 9769231357</p>
//         <p>+91 9167452453</p>
//       </div>

//       <h2 className={styles.formHeading}>Leave us a message</h2>
//       <p className={styles.subheading}>LET’S MAKE GREAT THINGS TOGETHER</p>

//       {submitted ? (
//         <p className={styles.success}>Thank you! Your message has been sent.</p>
//       ) : (
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <div className={styles.row}>
//   <div className={styles.inputGroup}>
//     <input
//       type="text"
//       placeholder="Your name *"
//       value={form.name}
//       onChange={(e) => setForm({ ...form, name: e.target.value })}
//     />
//     {errors.name && <small className={styles.error}>{errors.name}</small>}
//   </div>

//   <div className={styles.inputGroup}>
//     <input
//       type="email"
//       placeholder="Your email *"
//       value={form.email}
//       onChange={(e) => setForm({ ...form, email: e.target.value })}
//     />
//     {errors.email && <small className={styles.error}>{errors.email}</small>}
//   </div>
// </div>

//           <input
//             type="text"
//             placeholder="Subject"
//             value={form.subject}
//             onChange={(e) => setForm({ ...form, subject: e.target.value })}
//           />

//           <textarea
//             placeholder="Message"
//             rows="5"
//             value={form.message}
//             onChange={(e) => setForm({ ...form, message: e.target.value })}
//           />
//           <div>
//              {errors.message && <small className={styles.error}>{errors.message}</small>}
//           </div>
         

//         <div className={styles.buttonContainer}>
//   <button type="submit" className={styles.button}>
//             Send Message
//           </button>
//         </div>
//         </form>
//       )}
//     </div>
//   </div>
// </div>
// </>
    

    
//   );
// }

"use client";
import { useState } from "react";
import styles from "./contact.module.css";
import Image from "next/image";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email";
    }
    if (!form.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" }); // Reset form
        console.log('Email sent successfully');
      } else {
        setErrors({ general: result.message || 'Failed to send email' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<nav className={styles.navbar}>
     
        <div >
          <div>
            <Link href="/">
            <Image src="/Raaj-Logo1.png" alt="Logo"  width={150}   // set width in px
  height={0}   
  style={{ height: "auto" }}  />
  </Link>
          </div>
          
        </div>
        
        
<div className={styles.navLinks}>
  <Link href="/#about" className={styles.navLink}>ABOUT ME</Link>
  <Link href="/#work" className={styles.navLink}>MY WORK</Link>
  <Link href="/#gallery" className={styles.navLink}>GALLERY</Link>
  <Link href="/#contact" className={styles.navLink}>CONTACT ME</Link>
</div>
      </nav>

<div className={styles.contactPage}>
  <div className={styles.contactContainer}>
  <div className={styles.contactContainer}>
      <h1 className={styles.heading}>Contact detail</h1>
      <p className={styles.subheading}>
        HAVE A NEW PROJECT? WE&apos;D LOVE TO HEAR FROM YOU
      </p>

      <div className={styles.card1} onClick={() => window.open('mailto:raajdhoundiyal@gmail.com')}>
  <span className={styles.icon}><i className="fas fa-envelope"></i></span>
  <h3>Gmail</h3>
  <p>raajdhoundiyal@gmail.com</p>
</div>


      <div className={styles.card2}>
      <span className={styles.icon}><i className="fas fa-phone"></i></span>
        <h3>Phone Number</h3>
        <p>+91 9769231357</p>
        <p>+91 9167452453</p>
      </div>

      <h2 className={styles.formHeading}>Leave us a message</h2>
      <p className={styles.subheading}>LET&apos;S MAKE GREAT THINGS TOGETHER</p>

      {submitted ? (
        <p className={styles.success}>Thank you! Your message has been sent.</p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
  <div className={styles.inputGroup}>
    <input
      type="text"
      placeholder="Your name *"
      value={form.name}
      onChange={(e) => setForm({ ...form, name: e.target.value })}
    />
    {errors.name && <small className={styles.error}>{errors.name}</small>}
  </div>

  <div className={styles.inputGroup}>
    <input
      type="email"
      placeholder="Your email *"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
    />
    {errors.email && <small className={styles.error}>{errors.email}</small>}
  </div>
</div>

          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />

          <textarea
            placeholder="Message"
            rows="5"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div>
             {errors.message && <small className={styles.error}>{errors.message}</small>}
          </div>
         
          {errors.general && (
            <div className={styles.error}>{errors.general}</div>
          )}

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
        </form>
      )}
    </div>
  </div>
</div>
</>
    

    
  );
}