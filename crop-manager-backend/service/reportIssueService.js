const axios = require("axios");

/*
    * 该函数用于报告问题
    * @param {Object} req - 请求对象
    * @param {Object} res - 响应对象
    * @returns {Object} - 响应对象
    * @throws {Error} - 如果请求体中缺少标题或正文，则抛出错误
    * @throws {Error} - 如果提交问题失败，则抛出错误
 */
const reportIssue =  async (req, res) => {
    // 确保解析了 JSON 请求体
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).send({ message: 'Title and body are required.' });
    }

    try {
        const response = await axios.post(
            'https://api.github.com/repos/EdwinZhanCN/CropWebsite_Manager/issues',
            { title, body },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_ISSUE_TOKEN}`,
                    'User-Agent': 'YourAppName',
                },
            }
        );

        res.status(201).send({ message: 'Issue submitted successfully!' });
    } catch (error) {
        res.status(error.response?.status || 500).send({
            message: error.response?.data?.message || 'Failed to submit issue.',
        });
    }
};

module.exports = { reportIssue };