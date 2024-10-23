import { Link } from "@mui/material";

function PdtLink({text="", onclick=(returnObj:any)=>{}}) {  

  return <Link
  component="button"
  variant="body2"
  onClick={() => {
    onclick({});
  }}
>
  {text}
</Link>;
}

export default PdtLink;

