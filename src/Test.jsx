import React from "react";

function AvatarProfile() {
    return (
        <div
            style={{
                width: "300px",
                height: "200px",
                backgroundColor: "#5865F2", // 设置紫色背景
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
            }}
        >
            {/* 头像容器 */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {/* 头像图片 */}
                <img
                    src="https://via.placeholder.com/70" // 替换为你的头像链接
                    alt="avatar"
                    style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        border: "3px solid #2f3136", // 外圈边框
                    }}
                />

                {/* 在线状态 */}
                <div
                    style={{
                        position: "relative",
                        marginLeft: "-15px", // 调整状态圈的位置
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#3ba55d", // 在线状态绿色
                        borderRadius: "50%",
                        border: "3px solid #2f3136",
                    }}
                ></div>
            </div>

            {/* Add Status 按钮 */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "110px",
                    backgroundColor: "#2f3136",
                    color: "white",
                    borderRadius: "20px",
                    padding: "5px 10px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    cursor: "pointer",
                }}
            >
                <span style={{ marginRight: "5px", fontSize: "16px" }}>+</span>
                Add Status
            </div>

            {/* Edit Profile 按钮 */}
            <button
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    backgroundColor: "#5865F2",
                    color: "white",
                    borderRadius: "10px",
                    padding: "5px 15px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Edit Profile
            </button>
        </div>
    );
}

export default AvatarProfile;