
import { Alert } from "./components/alert"
import { useAccessName } from "./hooks/useAccessName"

export function RegisterAccess() {
    const [accessName, setAccessName] = useAccessName()
    const displayAlert = !accessName

    return displayAlert ? <Alert onClick={setAccessName} /> : null;
}
