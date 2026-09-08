import { useSelector } from "react-redux";
import {
    selectPostText,
    selectSelectedPlatforms,
} from "../redux/selectors";

const platformRules = {
    Instagram: 2200,
    "Twitter / X": 280,
    LinkedIn: 3000,
    Facebook: 63206,
};

function PostList() {
    const text = useSelector(selectPostText);
    const selectedPlatforms = useSelector(selectSelectedPlatforms);

    const characterCount = text.length;

    if (selectedPlatforms.length === 0) {
        return (
            <div className="empty-message">
                Select at least one platform to see validation.
            </div>
        );
    }

    return (
        <div>
            {selectedPlatforms.map((platform) => {
                const limit = platformRules[platform];

                const isValid = characterCount <= limit;

                return (
                    <div className="validation-card" key={platform}>
                        <h3>{platform}</h3>

                        <p className="limit">
                            {characterCount.toLocaleString()} /{" "}
                            {limit.toLocaleString()} characters
                        </p>

                        <p
                            className={
                                isValid
                                    ? "status valid"
                                    : "status invalid"
                            }
                        >
                            {isValid
                                ? "✓ Valid"
                                : "✗ Too many characters"}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default PostList;