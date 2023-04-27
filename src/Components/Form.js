import { useFormik } from "formik"
import '../Style/form.css'
import {nanoid} from 'nanoid'
import { useState } from "react";

function Form (){

    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submission, setSubmission] = useState(false);
 

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'This field is required';
        } else if (values.name.length < 3 ) {
            errors.name = 'A name must have 3 caracteres or more';
        }
      
        if (!values.message) {
            errors.message = 'This field is required';
        }
      
        if (!values.email) {
            errors.email = 'This field is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Please enter a valid email address';
        }
      
        return errors;
    };
    
    
    const formik = useFormik({
        initialValues: {
            id: nanoid(2),
            name: '',
            email: '',
            subject: '',
            message: '',
        }, validate,  
        onSubmit: (values, {resetForm}) => {
            postData(values);
            if(submission){
               resetForm();
           }
            /*setTimeout(() => {
                postData(values);
                if(submission == true){
                    resetForm();
                }
                setSubmitting(false);
            }, 2000)*/
           
          },
    });


function postData(valores){

    fetch("https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores, null, 2),
    })

    .then((response) => response.json())

    .then((post) => {
        setPosts((posts) => [post, ...posts]);
        console.log(post); //post actual
        console.log(posts); //cocatenacao de todos os posts
        setSubmission(true);
        console.log(submission);
    })

    .catch((error) => {
        setError(error.message);
        console.log("An error occured posting the data: "+error.message);
        //alert("An error occured posting the data: "+error.message);
        //setSubmission(false);
    })

    .finally(() => {
        setLoading(false);
        //console.log(loading);
    })

}

    return(
        <div className="form mt-3">
            <div className="mb-4 header">
                <h1>Contact Us </h1>
            </div>

            {error && (<div style={{color: 'red'}} className="offset-2 mb-3">An error occured during the submission..</div>)}
            {submission ? <div style={{color: 'green'}} className="offset-2 mb-3">The data waas submited sucessfully..</div> : null }

            <div className="formulario">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4 input-group row">
                        <label htmlFor="name"  className="col-form-label col-12 col-md-2">Name:</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            className="col-12 col-md-7 form-control"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                        />                  

                    </div>
                    {formik.touched.name && formik.errors.name ? <div className="error offset-2">{formik.errors.name}</div> : null}

                    <div className="mb-4 input-group row">
                        <label htmlFor="email" className="col-form-label col-12 col-md-2">Email:</label>
                        <input
                            name="email"
                            id="email"
                            className="col-12 col-md-7 form-control"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />                       
                        
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className="error offset-2">{formik.errors.email}</div> : null}

                    <div className="mb-4 input-group row">
                        <label htmlFor="subject" className="col-form-label col-12 col-md-2">Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="col-12 col-md-7 form-control"
                            onChange={formik.handleChange}
                            value={formik.values.subject}
                        />
                    </div>

                    <div className="mb-4 input-group row">
                        <label htmlFor="message" className="col-form-label col-12 col-md-2">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            className="col-12 col-md-7 form-control"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            onBlur={formik.handleBlur}
                        >

                        </textarea>

                    </div>
                      
                    {formik.touched.message && formik.errors.message ? <div className="error offset-2">{formik.errors.message}</div> : null}

                    <div className="offset-md-2">
                        {/*{loading && <input type="submit" id="btn" name="btn" className="btn btn-primary" value="Submit"/>*/}
                        <input type="submit" id="btn" name="btn" className="btn btn-primary" value="Submit"/>                             
                    </div>
                </form>
            </div>
            
        </div>
      
    )

}

export default Form;