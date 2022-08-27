import React, { useEffect } from 'react';
import useState from "react-usestateref";
// import { convertToObject } from 'typescript';
// import CSS from 'csstype';
import { Button } from "@mui/material"
import { Option } from "../typeFile";
import './index.css';
// type option = {
//     name: string,
//     weight: number,
//     used: boolean,
// };

const Wheel = (props: { items: Option[] }) => {
    const { items } = props;
    const [selectedItem, setSelectedItem, selectedItemRef] = useState<null | number>(null);
    const [spinning, setSpinning] = useState<string>(selectedItem !== null ? 'spinning' : '');
    const [selectedName, setSelectedName] = useState<string>("抽獎結果");
    useEffect(() => {
        setSpinning(selectedItem !== null ? 'spinning' : '');
    }, [selectedItem]);

    function selectItem(): void {
        if (selectedItemRef.current !== null) {
            setSelectedItem(null);
            setSelectedName("抽獎結果");
        } else {
            const tmp = Math.floor(Math.random() * items.length);
            setSelectedItem(tmp);
            setTimeout(function () { setSelectedName(tmp !== null ? items[tmp].name : "抽獎結果") }, 4200);
        }
    };

    return (
        <>
            <h1 style={{ textAlign: "center" }}>{selectedName}</h1>
            <div className="wheel-container">
                <div className={`wheel ${spinning}`} style={{
                    '--nb-item': items.length,
                    '--selected-item': selectedItemRef.current,
                } as React.CSSProperties} onClick={selectItem}>
                    {items.map((item, index) => (
                        <div className="wheel-item" key={index} style={{ '--item-nb': index } as React.CSSProperties} >
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
            <Button
                variant="contained"
                sx={{ width: "40%", mx: "30%", mt: "20px" }}
                color="primary"
                onClick={selectItem}>
                {selectedItemRef.current !== null ? "重設" : "轉!"}
            </Button>
        </>
    );
}

export default Wheel;

// export default class Wheel extends React.Component {
//   constructor(props:) {
//     super(props);
//     this.state = {
//       selectedItem: null,
//     };
//     this.selectItem = this.selectItem.bind(this);
//   }

//   selectItem() {
//     if (this.state.selectedItem === null) {
//       const selectedItem = Math.floor(Math.random() * this.props.items.length);
//       if (this.props.onSelectItem) {
//         this.props.onSelectItem(selectedItem);
//       }
//       this.setState({ selectedItem });
//     } else {
//       this.setState({ selectedItem: null });
//       setTimeout(this.selectItem, 500);
//     }
//   }

//   render() {
//     const { selectedItem } = this.state;
//     const { items } = this.props;

//     const wheelVars = {
//       '--nb-item': items.length,
//       '--selected-item': selectedItem,
//     };
//     const spinning = selectedItem !== null ? 'spinning' : '';

//     return (
//       <div className="wheel-container">
//         <div className={`wheel ${spinning}`} style={wheelVars} onClick={this.selectItem}>
//           {items.map((item, index) => (
//             <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
//               {item}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
