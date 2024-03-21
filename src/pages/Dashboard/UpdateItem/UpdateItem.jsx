import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Divider from "../../../components/Divider/Divider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, recipe, category, image, price, _id } = useLoaderData();
  //   const imgFileName = image.split("/")[4];
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // upload image at imgbb and get a img url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // send the data at server
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: res.data.data.display_url,
        category: data.category,
        price: parseFloat(data.price),
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        // reset();
        // // show success popup
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with img url", res.data);
  };

  return (
    <div>
      <Divider title={"Update Item"}></Divider>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-2">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register("name", { require: true })}
              required
              className="input input-bordered w-full "
            />
          </label>
          <div className="flex gap-6">
            {/* category */}
            <label className="form-control w-full my-4">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                defaultValue={category}
                {...register("category", {
                  require: true,
                })}
                className="select select-bordered w-full "
              >
                <option disabled value="Default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </label>

            {/* price */}
            <label className="form-control w-full my-4">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="Number"
                defaultValue={price}
                placeholder="Price"
                {...register("price", { require: true })}
                className="input input-bordered w-full "
              />
            </label>
          </div>

          {/* recipe details */}
          <label className="form-control">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
              defaultValue={recipe}
              {...register("recipe")}
              className="textarea textarea-bordered h-24"
              placeholder="Add the details of the item here"
            ></textarea>
          </label>

          <div className="flex flex-row justify-between form-control w-full my-6">
            <div>
              <input
                {...register("image", { require: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
            <div className="">
              <button className="btn shadow-lg shadow-slate-500 bg-indigo-500 bg-opacity-90 hover:bg-white hover:rounded-xl text-white hover:text-[#08172e] text-base">
                Update Item <FaUtensils className="ml-4"></FaUtensils>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
