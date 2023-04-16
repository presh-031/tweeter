const edit = () => {
  return (
    <div className="px-16 py-8">
      <div className="p-8 text-2xl outline">
        <p className="mb-16 text-4xl">Edit Profile</p>
        <form className="">
          <div></div>

          <label className="mb-4" htmlFor="name">
            Name *
          </label>
          <input
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="name"
          />

          <label className="mb-4" htmlFor="email">
            Email *
          </label>
          <input
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="email"
          />

          <label className="mb-4" htmlFor="headerImageUrl">
            Header ImageUrl *
          </label>
          <input
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="headerImageUrl"
          />

          <label className="mb-4" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="mb-8 block w-full border border-red-800"
            name="bio"
            id="bio"
            cols={30}
            rows={10}
          ></textarea>

          {/* <label htmlFor="name">Name *</label>
      <input type="text" id="name" /> */}
        </form>
      </div>
    </div>
  );
};

export default edit;
