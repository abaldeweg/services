release:
	git tag -a v$(TAG) -m "v$(TAG)"
	git push origin v$(TAG)

	git tag -a letter/v$(TAG) -m "v$(TAG)"
	git push origin letter/v$(TAG)
