import Image from "next/image";

const Comment = () => {
  return (
    <div className="mb-4 flex gap-[.635rem]">
      <Image
        src="https://picsum.photos/id/220/40/40"
        alt="dev"
        width={40}
        height={40}
        className="h-[4rem] w-[4rem] rounded-[8px]"
      />
      <div className="flex-1">
        <div className="flex  items-center gap-4 font-medium leading-[2.4rem]">
          <span className="text-[1.6rem]">FEYI</span>
          <span className="text-[1.2rem] text-[#555555]">
            @feyi_x &#183; 6h
          </span>
        </div>
        <p>
          Comment details go here Comment details go hereComment details go
          hereComment details go hereComment details go hereComment details go
          here Comment details go hereComment details go hereComment details go
          hereComment details go hereComment details go here
        </p>
      </div>
    </div>
  );
};

export default Comment;
