"use client"

import { useState, useEffect } from "react"
import { List, Badge, Spin, Input, Tooltip, Space } from "antd"
import { SearchOutlined, TagsOutlined } from "@ant-design/icons"
import { formatDistanceToNow } from "date-fns"

// 扩展 Commit 接口，添加 branches 属性
interface Commit {
  id: string
  hash: string
  message: string
  author: string
  timestamp: string
  pipelineCount: number
  aggregationStatus: string
  hasE2E?: boolean
  hasUnitTest?: boolean
  branches: string[] // 新增属性，存储 commit 所在的分支
}

interface CommitsListProps {
  commits: Commit[]
  selectedCommit: Commit | null
  onCommitSelect: (commit: Commit) => void
}

const CommitsList = ({ commits, selectedCommit, onCommitSelect }: CommitsListProps) => {
  const [searchText, setSearchText] = useState("")
  const [filteredCommits, setFilteredCommits] = useState(commits)

  useEffect(() => {
    let filtered = commits

    // 按搜索文本筛选
    if (searchText) {
      filtered = filtered.filter(
        (commit) =>
          commit.hash.includes(searchText) ||
          commit.message.toLowerCase().includes(searchText.toLowerCase()) ||
          commit.author.toLowerCase().includes(searchText.toLowerCase()) ||
          commit.branches.some((branch) => branch.toLowerCase().includes(searchText.toLowerCase())),
      )
    }

    setFilteredCommits(filtered)
  }, [searchText, commits])

  const getBadgeStatus = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in_progress":
        return "processing"
      case "pending":
        return "default"
      case "failed":
        return "error"
      default:
        return "default"
    }
  }

  const getTestTypeBadges = (commit: Commit) => {
    return (
      <div className="flex gap-1">
        {commit.hasE2E && (
          <Tooltip title="包含 E2E 测试">
            <Badge color="blue" className="scale-75" />
          </Tooltip>
        )}
        {commit.hasUnitTest && (
          <Tooltip title="包含单元测试">
            <Badge color="green" className="scale-75" />
          </Tooltip>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col shadow dark:shadow-gray-800">
      <div className="space-y-1 px-2 pt-2 dark:bg-gray-900">
        <Input
          placeholder="Search commits"
          prefix={<SearchOutlined className="text-gray-400 dark:text-gray-500" />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-7 text-xs dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
          allowClear
        />
      </div>
      <div className="flex-1 overflow-auto py-1 dark:bg-gray-900">
        {commits.length === 0 ? (
          <div className="flex justify-center p-4 dark:bg-gray-900">
            <Spin size="small" />
          </div>
        ) : filteredCommits.length === 0 ? (
          <div className="flex justify-center p-4 dark:bg-gray-900">
            <span className="text-xs text-gray-500 dark:text-gray-400">No matching commits</span>
          </div>
        ) : (
          <>
            <List
              size="small"
              dataSource={filteredCommits}
              className="dark:bg-gray-900"
              renderItem={(commit) => (
                <List.Item
                  key={commit.id}
                  onClick={() => onCommitSelect(commit)}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800
                   transition-colors ${
                    selectedCommit?.id === commit.id
                      ? "border-l-2 border-l-blue-500 bg-blue-50 dark:bg-gray-800 dark:bg-opacity-50 dark:border-l-blue-400"
                      : "dark:border-gray-700"
                  }`}
                  style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                  }}
                >
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Tooltip title={commit.hash}>
                          <span className="font-mono text-xs font-medium text-gray-700 dark:text-gray-300">
                            {commit.hash.substring(0, 7)}
                          </span>
                        </Tooltip>
                        {getTestTypeBadges(commit)}
                      </div>
                      <Badge
                        status={getBadgeStatus(commit.aggregationStatus)}
                        text={
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {commit.pipelineCount > 1 ? `${commit.pipelineCount}p` : "1p"}
                          </span>
                        }
                        className="scale-90"
                      />
                    </div>
                    <Tooltip title={commit.message}>
                      <div className="mt-1 line-clamp-1 text-xs text-gray-900 dark:text-gray-200">{commit.message}</div>
                    </Tooltip>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <Tooltip title={commit.author}>
                        <span className="line-clamp-1 max-w-[100px]">{commit.author}</span>
                      </Tooltip>
                      <span>·</span>
                      <span>{formatDistanceToNow(new Date(commit.timestamp))}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      {/* 显示分支信息 */}
                      {commit.branches.length > 0 && (
                        <>
                          <Tooltip title={commit.branches.join(", ")}>
                            <Space className="line-clamp-1 max-w-[200px]">
                              <TagsOutlined />
                              {commit.branches.join(", ")}
                            </Space>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default CommitsList

