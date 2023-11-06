import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
 	if (command == 'ghcode') {
  let url = "https://api.github.com/search/code?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n

${sul.total_count}
${sul.incomplete_results}

${v.name}
${v.path}
${v.score}
${v.html_url}
${v.name}
${v.git_url}

${v.repository.tags_url}
${v.repository.private}
${v.repository.contributors_url}
${v.repository.notifications_url}
${v.repository.description}
${v.repository.subscription_url}
${v.repository.keys_url}
${v.repository.branches_url}
${v.repository.deployments_url}
${v.repository.issue_comment_url}
${v.repository.labels_url}
${v.repository.subscribers_url}
${v.repository.releases_url}
${v.repository.comments_url}
${v.repository.stargazers_url}
${v.repository.id}

${v.repository.owner.gists_url}
${v.repository.owner.repos_url}
${v.repository.owner.following_url}
${v.repository.owner.starred_url}
${v.repository.owner.login}
${v.repository.owner.followers_url}
${v.repository.owner.type}
${v.repository.owner.url}
${v.repository.owner.subscriptions_url}
${v.repository.owner.received_events_url}
${v.repository.owner.avatar_url}
${v.repository.owner.events_url}
${v.repository.owner.html_url}
${v.repository.owner.site_admin}
${v.repository.owner.id}
${v.repository.owner.gravatar_id}
${v.repository.owner.node_id}
${v.repository.owner.organizations_url}
${v.repository.archive_url}
${v.repository.commits_url}
${v.repository.git_refs_url}
${v.repository.forks_url}
${v.repository.compare_url}
${v.repository.statuses_url}
${v.repository.git_commits_url}
${v.repository.blobs_url}
${v.repository.git_tags_url}
${v.repository.merges_url}
${v.repository.downloads_url}
${v.repository.url}
${v.repository.contents_url}
${v.repository.milestones_url}
${v.repository.teams_url}
${v.repository.fork}
${v.repository.issues_url}
${v.repository.full_name}
${v.repository.events_url}
${v.repository.issue_events_url}
${v.repository.languages_url}
${v.repository.html_url}
${v.repository.collaborators_url}
${v.repository.name}
${v.repository.pulls_url}
${v.repository.hooks_url}
${v.repository.assignees_url}
${v.repository.trees_url}
${v.repository.node_id}
${v.sha}
${v.url}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghcommits') {
  let url = "https://api.github.com/search/commits?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n

${sul.total_count}
${sul.incomplete_results}

${v.score}
${v.committer}

${v.author.gists_url}
${v.author.repos_url}
${v.author.following_url}
${v.author.starred_url}
${v.author.login}
${v.author.followers_url}
${v.author.type}
${v.author.url}
${v.author.subscriptions_url}
${v.author.received_events_url}
${v.author.avatar_url}
${v.author.events_url}
${v.author.html_url}
${v.author.site_admin}
${v.author.id}
${v.author.gravatar_id}
${v.author.node_id}
${v.author.organizations_url}
${v.html_url}
${v.comments_url}

${v.commit.comment_count}
${v.commit.committer}
${v.commit.committer.date}
${v.commit.committer.name}
${v.commit.committer.email}
${v.commit.author}
${v.commit.author.date}
${v.commit.author.name}
${v.commit.author.email}
${v.commit.tree}
${v.commit.tree.sha}
${v.commit.tree.url}
${v.commit.message}
${v.commit.url}

${v.repository.tags_url}
${v.repository.private}
${v.repository.contributors_url}
${v.repository.notifications_url}
${v.repository.description}
${v.repository.subscription_url}
${v.repository.keys_url}
${v.repository.branches_url}
${v.repository.deployments_url}
${v.repository.issue_comment_url}
${v.repository.labels_url}
${v.repository.subscribers_url}
${v.repository.releases_url}
${v.repository.comments_url}
${v.repository.stargazers_url}
${v.repository.id}
${v.repository.owner}
${v.repository.owner.gists_url}
${v.repository.owner.repos_url}
${v.repository.owner.following_url}
${v.repository.owner.starred_url}
${v.repository.owner.login}
${v.repository.owner.followers_url}
${v.repository.owner.type}
${v.repository.owner.url}
${v.repository.owner.subscriptions_url}
${v.repository.owner.received_events_url}
${v.repository.owner.avatar_url}
${v.repository.owner.events_url}
${v.repository.owner.html_url}
${v.repository.owner.site_admin}
${v.repository.owner.id}
${v.repository.owner.gravatar_id}
${v.repository.owner.node_id}
${v.repository.owner.organizations_url}
${v.repository.archive_url}
${v.repository.commits_url}
${v.repository.git_refs_url}
${v.repository.forks_url}
${v.repository.compare_url}
${v.repository.statuses_url}
${v.repository.git_commits_url}
${v.repository.blobs_url}
${v.repository.git_tags_url}
${v.repository.merges_url}
${v.repository.downloads_url}
${v.repository.url}
${v.repository.contents_url}
${v.repository.milestones_url}
${v.repository.teams_url}
${v.repository.fork}
${v.repository.issues_url}
${v.repository.full_name}
${v.repository.events_url}
${v.repository.issue_events_url}
${v.repository.languages_url}
${v.repository.html_url}
${v.repository.collaborators_url}
${v.repository.name}
${v.repository.pulls_url}
${v.repository.hooks_url}
${v.repository.assignees_url}
${v.repository.trees_url}
${v.repository.node_id}
${v.sha}
${v.url}

${v.parents[0].html_url}
${v.parents[0].sha}
${v.parents[0].url}
${v.node_id}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghissues') {
  let url = "https://api.github.com/search/issues?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n

 ${sul.total_count}
${sul.incomplete_results}

${v.created_at}
${v.title}
${v.body}
${v.labels_url}
${v.author_association}
${v.number}
${v.score}
${v.updated_at}
${v.comments_url}
${v.repository_url}
${v.id}
${v.state}
${v.locked}

${v.pull_request.patch_url}
${v.pull_request.html_url}
${v.pull_request.diff_url}
${v.pull_request.url}
${v.state_reason}
${v.comments}
${v.closed_at}
${v.url}

${v.labels[0].color}
${v.labels[0].name}
${v.labels[0].id}
${v.labels[0].url}
${v.labels[0].node_id}

${v.milestone.creator.gists_url}
${v.milestone.creator.repos_url}
${v.milestone.creator.following_url}
${v.milestone.creator.starred_url}
${v.milestone.creator.login}
${v.milestone.creator.followers_url}
${v.milestone.creator.type}
${v.milestone.creator.url}
${v.milestone.creator.subscriptions_url}
${v.milestone.creator.received_events_url}
${v.milestone.creator.avatar_url}
${v.milestone.creator.events_url}
${v.milestone.creator.html_url}
${v.milestone.creator.site_admin}
${v.milestone.creator.id}
${v.milestone.creator.gravatar_id}
${v.milestone.creator.node_id}
${v.milestone.creator.organizations_url}
${v.milestone.closed_at}
${v.milestone.description}
${v.milestone.created_at}
${v.milestone.title}
${v.milestone.closed_issues}
${v.milestone.url}
${v.milestone.due_on}
${v.milestone.labels_url}
${v.milestone.number}
${v.milestone.updated_at}
${v.milestone.html_url}
${v.milestone.id}
${v.milestone.state}
${v.milestone.open_issues}
${v.milestone.node_id}
${v.events_url}
${v.html_url}
${v.assignee}

${v.user.gists_url}
${v.user.repos_url}
${v.user.following_url}
${v.user.starred_url}
${v.user.login}
${v.user.followers_url}
${v.user.type}
${v.user.url}
${v.user.subscriptions_url}
${v.user.received_events_url}
${v.user.avatar_url}
${v.user.events_url}
${v.user.html_url}
${v.user.site_admin}
${v.user.id}
${v.user.gravatar_id}
${v.user.node_id}
${v.user.organizations_url}
${v.node_id}
 
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghlabels') {
  let url = "https://api.github.com/search/labels?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n

${sul.total_count}
${sul.incomplete_results}

${v.score}
${v.default}
${v.color}
${v.name}
${v.description}
${v.id}
${v.url}
${v.node_id}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghrepositories') {
  let url = "https://api.github.com/search/repositories?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n
${sul.total_count}
${sul.incomplete_results}

${v.stargazers_count}
${v.pushed_at}
${v.language}
${v.subscription_url}
${v.branches_url}
${v.issue_comment_url}
${v.labels_url}
${v.score}
${v.subscribers_url}
${v.releases_url}
${v.svn_url}
${v.id}
${v.master_branch}
${v.forks}
${v.archive_url}
${v.git_refs_url}
${v.forks_url}
${v.visibility}
${v.statuses_url}
${v.ssh_url}

${v.license.html_url}
${v.license.name}
${v.license.spdx_id}
${v.license.key}
${v.license.url}
${v.license.node_id}
${v.full_name}
${v.size}
${v.languages_url}
${v.html_url}
${v.collaborators_url}
${v.clone_url}
${v.name}
${v.pulls_url}
${v.default_branch}
${v.hooks_url}
${v.trees_url}
${v.tags_url}
${v.private}
${v.contributors_url}
${v.has_downloads}
${v.open_issues_count}
${v.notifications_url}
${v.description}
${v.created_at}
${v.watchers}
${v.deployments_url}
${v.keys_url}
${v.has_projects}
${v.archived}
${v.has_wiki}
${v.updated_at}
${v.comments_url}
${v.stargazers_url}
${v.disabled}
${v.git_url}
${v.has_pages}

${v.owner.gists_url}
${v.owner.repos_url}
${v.owner.following_url}
${v.owner.starred_url}
${v.owner.login}
${v.owner.type}
${v.owner.followers_url}
${v.owner.url}
${v.owner.subscriptions_url}
${v.owner.received_events_url}
${v.owner.avatar_url}
${v.owner.events_url}
${v.owner.html_url}
${v.owner.site_admin}
${v.owner.id}
${v.owner.gravatar_id}
${v.owner.node_id}
${v.owner.organizations_url}
${v.commits_url}
${v.compare_url}
${v.git_commits_url}
${v.blobs_url}
${v.git_tags_url}
${v.merges_url}
${v.downloads_url}
${v.has_issues}
${v.url}
${v.contents_url}
${v.mirror_url}
${v.milestones_url}
${v.teams_url}
${v.fork}
${v.issues_url}
${v.events_url}
${v.issue_events_url}
${v.assignees_url}
${v.open_issues}
${v.watchers_count}
${v.node_id}
${v.homepage}
${v.forks_count}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghtopics') {
  let url = "https://api.github.com/search/topics?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n
${sul.total_count}
${sul.incomplete_results}

${v.name}
${v.display_name}
${v.short_description}
${v.description}
${v.created_by}
${v.released}
${v.created_at}
${v.updated_at}
${v.featured}
${v.curated}
${v.score}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

if (command == 'ghusers') {
  let url = "https://api.github.com/search/users?q=" + text;

let options = {
  headers: {
    Authorization: "Bearer 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",
    Accept: "application/vnd.github+json"
  }
};

let res = await fetch(url, options)
let sul = await res.json()
	let listSections = []
	Object.values(sul.items).map((v, index) => {
		let des = `\n\n
${sul.total_count}
${sul.incomplete_results}

${v.login}
${v.id}
${v.node_id}
${v.avatar_url}
${v.gravatar_id}
${v.url}
${v.html_url}
${v.followers_url}
${v.subscriptions_url}
${v.organizations_url}
${v.repos_url}
${v.received_events_url}
${v.type}
${v.score}
${v.following_url}
${v.gists_url}
${v.starred_url}
${v.events_url}
${v.site_admin}
`
	listSections.push([index + ' ' + cmenub + ' Nih', [
          ['Lihat', usedPrefix + 'ss ' + v.url, des]
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Github Search 🔎 ' + htka, `⚡ Total ${sul.total_count} Code, Silakan pilih Github Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, `☂️ Github Search Disini ☂️`, listSections, m)
}

}
handler.command = /^gh(repositories|(commit|label|topic|user)s|issues|code)$/i

export default handler