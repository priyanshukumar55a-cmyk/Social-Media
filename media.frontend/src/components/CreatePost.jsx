import { Form, redirect } from "react-router-dom";
import { addItemToServer } from "../services/itemServices";

const CreatePost = () => {

  return (
    <Form method="POST" className="create-post">
      
      <div className="mb-3">
        <label
          htmlFor="userId"
          className="form-label"
        >
          Enter Your User Id Here
        </label>

        <input
          type="text"
          name="userId"
          required
          className="form-control"
          id="userId"
          placeholder="Your User Id"
        />
      </div>
      
      <div className="mb-3">
        <label
          htmlFor="title"
          className="form-label"
        >
          Post Title
        </label>

        <input
          type="text"
          name="title"
          required
          className="form-control"
          id="title"
          placeholder="How are you feeling today..."
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="body"
          className="form-label"
        >
          Post Content
        </label>

        <textarea
          type="text"
          name="body"
          rows="4"
          required
          className="form-control"
          id="body"
          placeholder="Tell us more about it"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="reactions"
          className="form-label"
        >
          Number of reactions 
        </label>

        <input
          type="text"
          name="reactions"
          required
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post"
        />
      </div>

      <div className="mb-3">
        <label
          htmlFor="tags"
          className="form-label"
        >
          Enter your hashtags here
        </label>

        <input
          type="text"
          name="tags"
          required
          className="form-control"
          id="tags"
          placeholder="Please enter tags using spaces"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
      >
        Post
      </button>
    </Form>
  );
};

export async function createPostAction(data){
  const formData = await data.request.formData();
  const postData= Object.fromEntries(formData)
  postData.tags=postData.tags.split(/\s+/)
  
  console.log("Post Data to be sent to server:", postData); // Debugging line to check the post data before sending

  try {
    await addItemToServer(postData.userId, postData.title, postData.body, postData.reactions, postData.tags);
  } catch (error) {
    console.error("Error adding post to server:", error);
    // Optionally, you can handle the error by showing a message to the user or redirecting to an error page
  }

  return redirect("/");
}

export default CreatePost;
