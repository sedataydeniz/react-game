export default function BoxProp(val,dependencies,active=false,isCurrent){
    this.val = val;
    this.active = active;
    this.dependencies = dependencies;
}