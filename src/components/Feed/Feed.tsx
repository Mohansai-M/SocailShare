import { ReactHTMLElement, useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../ContextAPI";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
function Feed(props: any) {
  const {isLiked} = props;
  console.log(isLiked);
  const { getImageURL, HandleLike, userId } = useContext(AuthorizationContext);
  const [url, setURL] = useState<string>("");

  useEffect(() => {
    getImageURL(props.imageURL).then((url: string) => setURL(url));
  });

  return (
    <div className="w-auto bg-white border-solid border-b-4 border-t-4 border-grey-100 rounded-lg p-4 mb-4 flex justify-center">
      <Card className="w-4/5 text-gray-700 mb-2 border-2 border-grey-100 " sx={{ maxWidth: "auto" }}>
        <CardMedia
          className="w-full rounded-lg mb-2"
          sx={{ height: 500 }}
          image={url}
          title={props.Name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Caption
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.caption}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => HandleLike(props.ImageID, userId)}
          >
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button size="small">Comments</Button>
        </CardActions>
      </Card>
    </div>
  );
}
    export default Feed;
