import {Card, CardTitle, CardBody} from "@progress/kendo-react-layout";
import {Dialog} from "@progress/kendo-react-dialogs";

import {processDefinitionDataSource} from "./data";
import {useState} from "react";

function ProcessDefinitionList() {
    const [dialogOptions, setDialogOptions] = useState({visible: false, definition: null});
    const dialogProps = {
        title: "发起流程", autoFocus: true, width: "500px", height: "300px",
        onClose: () => {
            setDialogOptions({visible:false, definition: null});
        }
    }

    function handleClick(dataItem) {
        setDialogOptions({visible: true, definition: dataItem});
    }

    return <div className="k-d-no-gap-flex">
        {processDefinitionDataSource.map(item => {
            return <Card key={item.id} className="k-cursor-pointer" style={{fontSize: "12px"}} onClick={function () {
                handleClick(item);
            }}>
                <CardBody>
                    <CardTitle></CardTitle>
                    <div className="k-pb-1"><span>版本：</span>{item.version}</div>
                    <div className="k-pb-1"><span>流程名称：</span>{item.name}</div>
                    <div><span>签章流程：</span>{item.signature ? "是" : "否"}</div>
                </CardBody>
            </Card>;
        })}
        {
            dialogOptions.visible && <Dialog {...dialogProps}>
                <div><span>版本: </span>{dialogOptions.definition && dialogOptions.definition.version}</div>
                <div><span>版本: </span>{dialogOptions.definition && dialogOptions.definition.name}</div>
            </Dialog>
        }
    </div>;
}

export {ProcessDefinitionList};