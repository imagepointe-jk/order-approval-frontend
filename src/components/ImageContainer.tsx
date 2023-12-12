import styles from "./styles/ImageContainer.module.css";

type ImageContainerProps = {
  imgUrl: string;
};

export function ImageContainer({ imgUrl }: ImageContainerProps) {
  return (
    <div className={`round-border ${styles["main"]}`}>
      <img
        src={imgUrl}
        alt="art-proof"
        onError={(e) => {
          (e.target as any).src = "https://placehold.co/300x300?text=No+Image";
        }}
      />
    </div>
  );
}
