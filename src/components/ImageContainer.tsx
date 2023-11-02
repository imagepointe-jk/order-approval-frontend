type ImageContainerProps = {
  img: string;
};

export function ImageContainer({ img }: ImageContainerProps) {
  return (
    <div className="image-container round-border">
      <img src={img} alt="" />
    </div>
  );
}
