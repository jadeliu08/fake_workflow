import {Card, CardTitle, CardBody} from "@progress/kendo-react-layout";

import {processDefinitionDataSource} from "./data";

function ProcessDefinitionList() {
    function handleClick(dataItem) {
        console.log(dataItem);
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
    </div>;
}

export {ProcessDefinitionList};