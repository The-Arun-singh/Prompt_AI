import PromptCard from "./PrompCard"

const Profile = ({
  name, desc, data, handleEdit, handleDelete
}) => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc ">
        {desc}
      </p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
            <PromptCard
              key={post.id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />  
          ))}
      </div>
    </section>
  )
}

export default Profile  